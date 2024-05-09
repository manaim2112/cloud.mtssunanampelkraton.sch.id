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

export default function AnalisisAdmin() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [mapel, setMapel] = useState<CbtInterface[]>([]);
    const [mapelSelect, setMapelSelect] = useState<CbtInterface[]>([]);
    const [soal, setSoal] = useState<Array<Array<SoalInterface>>>();
    const [result, setResult] = useState<ResultInterface[][]>();
    const [kelas, setKelas] = useState<KelasInterface[]>([]);
    const [kelasSelect, setKelasSelect] = useState<KelasInterface[]>([]);

    useEffect(() => {
        fetch(pathGetKelasAll).then(r=>r.json()).then(r => {
            if(r.status !== 200) return;

            setKelas(r.data);
        })
    }, [kelas])
    useEffect(() => {
        fetch(pathGetUsersAll).then(r => r.json()).then(data => {
            if(data.status !== 200) return;
            setUsers(data.data)
        })
    }, [users])


    useEffect(() => {
        fetch(pathGetCBTListAll).then(r=>r.json()).then(r => {
            if(r.status !== 200) return;    
            setMapel(r.data);
            for(const i of r.data as CbtInterface[]) {
                fetch(pathGetSoalWithIdList(i.id)).then(r => r.json()).then(r => {
                    if(r.status !== 200) return;
                    setSoal(prevSoal => {
                        if(!prevSoal) return [r.data];

                        prevSoal.push(r.data);
                    });
                })


                fetch(pathGetCBTResultWithListId(i.id)).then(r => r.json()).then(r => {
                    if(r.status !== 200)  return;
                    setResult(prevResult => {
                        if(!prevResult) return [r.data]
                        prevResult?.push(r.data)
                    })
                })
            }
        })
    }, [mapel, soal, result]);

    const RunningAnalisis = async () => {
        if(!mapel) return;
        for(const m of mapel) {
            fetch(pathGetCBTResultWithListId(m.id)).then(r => r.json()).then(r => {
                if(r.status !== 200) return;
                
            })
        }
    }

    const GetValue = (userId :number) => {

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
                    <DataAnalisis data={users} kelas={kelasSelect} mapel={mapelSelect}/>
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
const DataAnalisis = (props: { data: UserInterface[]; kelas: KelasInterface[]; mapel : CbtInterface[] }) => {
    const { data, kelas, mapel} = props;
    const [userSelect, setUserSelect] = useState<UserInterface[]>([])
    useEffect(() => {
        setUserSelect(() => {
            const select = data.filter(Obj => {
                const u = kelas.findIndex(O => O.name == Obj.kelas)
                if(u !== -1) return true;
                return false;
            })

            return select;
        })
        console.log("TEST")
    }, [kelas])

    return(
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
                    userSelect.map((v,k) => (
                        <TableRow key={k}>
                            <TableCell className="font-medium">{v.nisn}</TableCell>
                            <TableCell>{v.name}</TableCell>
                            <TableCell>{v.kelas}</TableCell>
                            <TableCell className="text-right">{v.ruang}</TableCell>
                            <TableCell className="text-right">{v.sesi}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    )
}

const Kelas = (props: { data: KelasInterface[]; setKelas: React.Dispatch<React.SetStateAction<KelasInterface[]>> }) => {
    const {data, setKelas} = props;
    const [select, setSelect] = useState<KelasInterface[]>();
    const handleChecked = (status: string | boolean, k: number) => {
        setSelect(prevSelect => {
            // Jika prevSelect belum terdefinisi, inisialisasi dengan array kosong
            if (typeof prevSelect === 'undefined') {
                prevSelect = [];
            }
    
            // Jika status true (dicentang), tambahkan item jika belum ada
            if (status) {
                if (!prevSelect.some(obj => obj.id === data[k].id)) {
                    return [...prevSelect, data[k]];
                }
            } else { // Jika status false (tidak dicentang), hapus item jika ada
                return prevSelect.filter(obj => obj.id !== data[k].id);
            }
            // Jika tidak ada perubahan, kembalikan state yang sama
            return prevSelect;
        });
    };
    

    const Analysis = () => {
        setKelas(select ?? []);
    }
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

                <Button onClick={() => Analysis()}>Analisa Sekarang</Button>
            </CardContent>

        </Card>
    )
}
const Mapel = (props: { data: CbtInterface[]; setMapel: React.Dispatch<React.SetStateAction<CbtInterface[]>>; }) => {
    const {data, setMapel} = props;
    const [select, setSelect] = useState<CbtInterface[]>([]);
    const handleChecked = (status: string | boolean, k: number) => {
        setSelect(prevSelect => {
            // Jika prevSelect belum terdefinisi, inisialisasi dengan array kosong
            if (typeof prevSelect === 'undefined') {
                prevSelect = [];
            }
    
            // Jika status true (dicentang), tambahkan item jika belum ada
            if (status) {
                if (!prevSelect.some(obj => obj.id === data[k].id)) {
                    return [...prevSelect, data[k]];
                }
            } else { // Jika status false (tidak dicentang), hapus item jika ada
                return prevSelect.filter(obj => obj.id !== data[k].id);
            }
            // Jika tidak ada perubahan, kembalikan state yang sama
            return prevSelect;
        });
    };
    

    const Analysis = () => {
        setMapel(select);
    }
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

                <Button onClick={() => Analysis()}>Analisa Sekarang</Button>
            </CardContent>

        </Card>
    )
}