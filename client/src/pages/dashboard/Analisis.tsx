import { CbtInterface } from "@/lib/interface/CbtInterface";
import { ResultInterface } from "@/lib/interface/ResultInterface";
import { SoalInterface } from "@/lib/interface/SoalInterface";
import { UserInterface } from "@/lib/interface/UserInterface"
import { pathGetCBTListAll, pathGetCBTResultWithListId, pathGetKelasAll, pathGetSoalWithIdList, pathGetUsersAll } from "@/service/path";
import { Suspense, useEffect, useState } from "react"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KelasInterface } from "@/lib/interface/KelasInterface";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
interface UserAnalisis {
    userid : number;
    mapelid : number;
    nilai : number;
}

export default function AnalisisAdmin() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [mapel, setMapel] = useState<CbtInterface[]>([]);
    const [mapelSelect, setMapelSelect] = useState<CbtInterface[]>([]);
    // const [soal, setSoal] = useState<Array<Array<SoalInterface>>>();
    // const [result, setResult] = useState<ResultInterface[][]>();
    const [kelas, setKelas] = useState<KelasInterface[]>([]);
    const [kelasSelect, setKelasSelect] = useState<KelasInterface[]>([]);
    const [userSelect, setUserSelect] = useState<UserInterface[]>([]);
    const [resultAnalisis, setResultAnalisis] = useState<UserAnalisis[]>([])
    const [alpha] = useState<Array<string>>("ABCDEFGHIJKLMOPQRSTUVWXYZ".split(""));

    useEffect(() => {
        fetch(pathGetKelasAll).then(r=>r.json()).then(r => {
            if(r.status !== 200) return;

            setKelas(r.data);
        })
        fetch(pathGetUsersAll).then(r => r.json()).then(data => {
            if(data.status !== 200) return;
            setUsers(data.data)
        })
    }, [])


    
    useEffect(() => {
        const k = kelasSelect.map(e => e.name.trim());
        const filter = users.filter(Obj => k.includes(Obj.kelas.trim()))
        setUserSelect(filter);

    }, [kelasSelect])

    useEffect(() => {
        fetch(pathGetCBTListAll).then(r=>r.json()).then(r => {
            if(r.status !== 200) return;    
            setMapel(r.data);
        })
    }, []);

    const RunningAnalisis = async () => {

        if(!mapelSelect) return;
        const mapelAnalis = [] as UserAnalisis[][];
        for(const m of mapelSelect) {
            const soal = await (await fetch(pathGetSoalWithIdList(m.id))).json();
            if(soal.status !== 200) continue;
            const result = await (await fetch(pathGetCBTResultWithListId(m.id))).json();
            if(result.status !== 200) continue;
            const dataSoal = soal.data as SoalInterface[]
            const dataResult = result.data as ResultInterface[]
            console.log(dataResult);
            const userAn = [] as UserAnalisis[];
            dataResult.map(r => {
                const ana = {} as UserAnalisis;

                const parse = JSON.parse(r.answer) as Array<[number, number|null]>;
                const sort = parse.sort((a,b) => a[0] - b[0]);
                const point = [] as Array<number>;
                dataSoal.forEach((h, k) => {
                    const answer = JSON.parse(h.answer) as Array<string>;
                    if(!sort[k]) return;
                    const select = sort[k][1];
                    if(typeof select === "number") {
                        if(answer.includes(alpha[select])) {
                            point.push(Number(h.score))
                        }

                    }
                })

                if(point.length > 0) {
                    ana.nilai  = point.reduce((a,b) => a+b);
                } else {
                    ana.nilai = 0;
                }
                ana.mapelid = m.id;``
                ana.userid = r.iduser;

                userAn.push(ana);
            })

            mapelAnalis.push(userAn)
        }

        const u = mapelAnalis.flat().sort((a,b) => a.userid - b.userid);

        setResultAnalisis(u);
    }

    return(
        <Suspense fallback="TUnggu Sebentar">
            
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Suspense fallback="WAIT">
            <Sidebar />
        </Suspense>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Suspense fallback="WAIT">
            <Navbar />
            </Suspense>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid order-2 lg:order-1 auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <Button onClick={RunningAnalisis} variant={"default"}>MULAI ANALISIS</Button>
                    <DataAnalisis data={userSelect} result={resultAnalisis} kelas={kelasSelect} mapel={mapelSelect}/>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="mb-2">
                        <Mapel data={mapel} setMapel={setMapelSelect}/>
                    </div>
                    <div className="mb-2">
                        <Kelas data={kelas} setKelas={setKelasSelect}/>
                    </div>
                </div>
            </main>
        </div>
        </div>
        </Suspense>
    )
}
// Fungsi untuk menyesuaikan semua nilai agar berada dalam rentang 80-100 dengan scaling
const scaleScores = (kkm :number, scores : Array<number>) : Array<number> => {
    // Mencari nilai minimum dan maksimum dalam array asli
    scores = scores.map(a => Number(a));
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    // Jika semua nilai sama, ubah semua menjadi 80 untuk menghindari pembagian dengan nol
    if (minScore === maxScore) {
        return scores.map(() => kkm);
    }

    // Skala nilai-nilai ke dalam rentang 80-100
    return scores.map(score => {
        return Math.ceil(kkm + (score - minScore) * (100 - kkm) / (maxScore - minScore));
    });
}

// Fungsi untuk mengubah nilai berdasarkan mapelId
const adjustScoresByMapelId = (kkm : number, results: UserAnalisis[]): UserAnalisis[] => {
    // Mengelompokkan nilai berdasarkan mapelId
    const groupedByMapel: { [key: number]: UserAnalisis[] } = results.reduce((acc, result) => {
        if (!acc[result.mapelid]) {
            acc[result.mapelid] = [];
        }
        acc[result.mapelid].push(result);
        return acc;
    }, {} as { [key: number]: UserAnalisis[] });

    // Menskalakan nilai dalam setiap kelompok mapelId
    for (const mapelId in groupedByMapel) {
        if (Object.prototype.hasOwnProperty.call(groupedByMapel, mapelId)) {
            const scores = groupedByMapel[mapelId].map(r => r.nilai);
            const scaledScores = scaleScores(kkm, scores);

            // Mengupdate nilai dalam objek asli
            groupedByMapel[mapelId].forEach((result, index) => {
                result.nilai = scaledScores[index];
            });
        }
    }

    // Menggabungkan kembali hasilnya ke dalam array objek asli
    return Object.values(groupedByMapel).flat();
}



const DataAnalisis = (props: { data: UserInterface[]; result : UserAnalisis[]; kelas: KelasInterface[]; mapel : CbtInterface[] }) => {
    const { data, kelas, result, mapel} = props;
    // const [userSelect, setUserSelect] = useState<UserInterface[]>([])
    // useEffect(() => {
    //     setUserSelect(() => {
    //         const select = data.filter(Obj => {
    //             const u = kelas.findIndex(O => O.name == Obj.kelas)
    //             if(u !== -1) return true;
    //             return false;
    //         })

    //         return select;
    //     })
    //     console.log("TEST")
    // }, [kelas])

    const findValue = (mapelId :number, userId:number) => {
        const y = result.filter(Obj => Obj.mapelid == mapelId && Obj.userid == userId);

        if(y.length < 1) return 0;

        return y[0].nilai
    }

    const handleExport = () => {
        const dataExport : string[][] = [];
        const Header = ["NO", "NISN", "NAMA", "KELAS", "RUANG", "SESI", ...mapel.map(e => e.name)];
        dataExport.push(Header);
        data.forEach((e, k) => {
            let nilai = result.filter(Obj => Obj.userid == e.id);
            if(nilai.length < 1) {
                nilai  = mapel.map(Obj => {
                    return {
                        mapelid : Obj.id,
                        nilai : 0,
                        userid : e.id
                    }
                })
            }
            dataExport.push([String(k+1), e.nisn, e.name, e.kelas.trim(), e.ruang, e.sesi, ...nilai.map(r => String(r.nilai))])
        })
        
        const newWorkBook = XLSX.utils.book_new();
        const newWorkSheet = XLSX.utils.aoa_to_sheet(dataExport)
        XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, "SEMUA");
        
        kelas.forEach(t => {
            const Headers = [Header];
            const re = Headers.concat(dataExport.filter(Obj => Obj[3] == t.name.trim()))
            
            const ws = XLSX.utils.aoa_to_sheet(re);
            XLSX.utils.book_append_sheet(newWorkBook, ws, t.name.trim());
        })

        XLSX.writeFile(newWorkBook, "Data_analisis_AMBK" + Date.now() + ".xlsx")
    }
    const handleExportPrint = async () => {

        const {value : kkm} = await Swal.fire({
            title : "Input Nilai Miniminum",
            input : "number",
            inputValidator : function(value) {
                if(!value) return "PAstikan Di isi";
                if(typeof value === "number") {
                    if(value < 0) return "Pastikan Nilainya positif"
                }
            }
        })

        if(!kkm) return;
        const resultNew = adjustScoresByMapelId(kkm, result);


        const dataExport : string[][] = [];
        const Header = ["NO", "NISN", "NAMA", "KELAS", "RUANG", "SESI", ...mapel.map(e => e.name)];
        dataExport.push(Header);
        data.forEach((e, k) => {
            let nilai = resultNew.filter(Obj => Obj.userid == e.id);
            if(nilai.length < 1) {
                nilai  = mapel.map(Obj => {
                    return {
                        mapelid : Obj.id,
                        nilai : 0,
                        userid : e.id
                    }
                })
            }
            dataExport.push([String(k+1), e.nisn, e.name, e.kelas.trim(), e.ruang, e.sesi, ...nilai.map(r => String(r.nilai))])
        })

        const newWorkBook = XLSX.utils.book_new();
        const newWorkSheet = XLSX.utils.aoa_to_sheet(dataExport)
        
        XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, "SEMUA");
        
        kelas.forEach(t => {
            const Headers = [Header];
            const re = Headers.concat(dataExport.filter(Obj => Obj[3] == t.name.trim()))
            const ws = XLSX.utils.aoa_to_sheet(re);
            XLSX.utils.book_append_sheet(newWorkBook, ws, t.name.trim());
        })

        XLSX.writeFile(newWorkBook, "_INDEX_Data_analisis_AMBK" + Date.now() + ".xlsx")
    }

    return(
        <>
            <Button onClick={handleExport} variant={"outline"}>EXPORT NILAI ASLI</Button>
            <Button onClick={handleExportPrint} variant={"outline"}>EXPORT NILAI INDEX</Button>
            <Table>
                <TableCaption>Data Analisis Hasil Tes Murid</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">NISN</TableHead>
                        <TableHead>NAMA</TableHead>
                        <TableHead>KELAS</TableHead>
                        <TableHead className="text-right">RUANG</TableHead>
                        <TableHead className="text-right">SESI</TableHead>
                        {
                            mapel.map((v, k) => (
                                <TableHead key={k} className="text-right">{v.name}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((v,k) => (
                            <TableRow key={k}>
                                <TableCell className="font-medium">{v.nisn}</TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell>{v.kelas}</TableCell>
                                <TableCell className="text-right">{v.ruang}</TableCell>
                                <TableCell className="text-right">{v.sesi}</TableCell>
                                {
                                    mapel.map((mv, mk) => (
                                        <TableCell key={mk} className="text-right">{findValue(mv.id, v.id)}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>

    )
}

const Kelas = (props: { data: KelasInterface[]; setKelas: React.Dispatch<React.SetStateAction<KelasInterface[]>> }) => {
    const {data, setKelas} = props;
    const [select, setSelect] = useState<KelasInterface[]>([]);
    const handleChecked = (status: string | boolean, k: number) => {
        let prevSelect = select;
            // Jika prevSelect belum terdefinisi, inisialisasi dengan array kosong
            if (typeof prevSelect === 'undefined') {
                prevSelect = [];
            }
    
            // Jika status true (dicentang), tambahkan item jika belum ada
            if (status) {
                if (!prevSelect.some(obj => obj.id === data[k].id)) {
                    prevSelect =  [...prevSelect, data[k]];
                }
            } else { // Jika status false (tidak dicentang), hapus item jika ada
                prevSelect =  prevSelect.filter(obj => obj.id !== data[k].id);
            }
            setKelas(prevSelect);

            // Jika tidak ada perubahan, kembalikan state yang sama
        setSelect(prevSelect);
    };
    
    return(
        <Card>
            <CardHeader>
                <CardTitle>LIST KELAS</CardTitle>
                <CardDescription>Silahkan Pilih Kelas yang akan di analisa</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    data.map((v,k) => (
                        <div key={k} className="flex items-center space-x-2 mb-3">
                            <Checkbox id={"list-mapel-" + k} onCheckedChange={e => handleChecked(e, k)} />
                            <label
                                htmlFor={"list-mapel-" + k}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {v.name}
                            </label>
                        </div>
                    ))
                }

            </CardContent>

        </Card>
    )
}
const Mapel = (props: { data: CbtInterface[]; setMapel: React.Dispatch<React.SetStateAction<CbtInterface[]>>; }) => {
    const {data, setMapel} = props;
    const [select, setSelect] = useState<CbtInterface[]>([]);
    const handleChecked = (status: string | boolean, k: number) => {
            let prevSelect = select;
            // Jika prevSelect belum terdefinisi, inisialisasi dengan array kosong
            if (typeof prevSelect === 'undefined') {
                prevSelect = [];
            }
    
            // Jika status true (dicentang), tambahkan item jika belum ada
            if (status) {
                if (!prevSelect.some(obj => obj.id === data[k].id)) {
                    prevSelect = [...prevSelect, data[k]];
                }
            } else { // Jika status false (tidak dicentang), hapus item jika ada
                prevSelect = prevSelect.filter(obj => obj.id !== data[k].id);
            }
            // Jika tidak ada perubahan, kembalikan state yang sama
            setMapel(prevSelect);
            setSelect(prevSelect);

    };
    

    return(
        <Card>
            <CardHeader>
                <CardTitle>LIST MAPEL</CardTitle>
                <CardDescription>Silahkan Pilih mapel yang akan di analisa</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    data.map((v,k) => (
                        <div key={k} className="flex items-center space-x-2 mb-3">
                            <Checkbox id={"list-mapel-" + k} onCheckedChange={e => handleChecked(e, k)} />
                            <label
                                htmlFor={"list-mapel-" + k}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {v.name}
                            </label>
                        </div>
                    ))
                }

            </CardContent>

        </Card>
    )
}