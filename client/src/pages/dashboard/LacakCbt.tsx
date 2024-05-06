import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Suspense, useEffect, useState } from "react";
import { pathGetCBTListWithId, pathGetCBTResultWithListId, pathGetRuangAll, pathGetSesiAll, pathGetUsersAll, pathPrintKehadiran, pathRemoveResultWithId
  // WS_URL,
} from "@/service/path";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { ResultInterface } from "@/lib/interface/ResultInterface";
import { UserInterface } from "@/lib/interface/UserInterface";
import { SesiInterface } from "@/lib/interface/SesiInterface";
import { RuangInterface } from "@/lib/interface/RuangInterface";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import { RefreshAdmin } from "@/lib/interface/RefreshAdmin";
import { getAuthorizeAdmin } from "@/helper/getAuthorizeAdmin";
import { CbtInterface } from "@/lib/interface/CbtInterface";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
// import { SoalInterface } from "@/lib/interface/SoalInterface";
// import { SoalInterface } from "@/lib/interface/SoalInterface";

export default function LacakCbt() {
  const { id } = useParams();
  const [user, setUser] = useState<UserInterface[]>([]);
  const [sesi, setSesi] = useState<SesiInterface[]>([]);
  const [ruang, setRuang] = useState<RuangInterface[]>([]);
  const [userSelect, setUserSelect] = useState<UserInterface[]>([]);
  const [sesiActive, setSesiActive] = useState<SesiInterface>();
  const [ruangActive, setRuangActive] = useState<RuangInterface>();
  const [result, setResult] = useState<ResultInterface[]>();
  // const [soal, setSoal] = useState<SoalInterface[]>();
  // const [socket, setSocket] = useState<WebSocket>();
  const [flashUser] = useState<RefreshAdmin | null>(getAuthorizeAdmin());
  const [detail, setDetail] = useState<CbtInterface>();
  // const [alpha] = useState<string[]>("abcdefghijklmnopqrstuvwxyz".split(""));

  useEffect(() => {
    fetch(pathGetCBTListWithId(Number(id))).then(r => r.json()).then(res => {
      if(res.status !== 200) return;
      setDetail(res.data);
    })
  }, [id])

  // useEffect(() => {
  //   fetch(pathGetSoalWithIdList(Number(id))).then(r => r.json()).then(rs => {
  //     if(rs.status !== 200) return;
  //     setSoal(rs.data);
  //   })
  // }, [id])

  // Menghubungkan koneksi dengan yang lain
  // useEffect(() => {
  //   const ws = new WebSocket(WS_URL(Number(id)));
  //   setSocket(ws);
  //   ws.onopen = () => {
  //     console.log("Connected to WebSocket server");
  //   };
  //   ws.onclose = () => {
  //     console.log("Connection to WebSocket server closed");
  //   };

  //   ws.onmessage = (event : MessageEvent) => {
  //     console.log(event)
  //   }
  //   return () => {
  //     ws.close();
  //   };
  // }, [id]);

  // // mengrim pesan kepada guest
  // const sendMessage = (message: string) => {
  //   console.log(message);
  //   // if (socket && message !== "") {
  //   //   socket.send("proktor-" + message);
  //   // }
  // };

  const handleCheckStatus = (user: UserInterface) => {
    const index = result?.findIndex((Obj) => Obj.iduser == user.id);
    if (index == -1 || index === undefined) return "BELUM";
    const { process } = result ? result[index] : { process: "BELUM" };
    return process;
  };




  useEffect(() => {
    fetch(pathGetUsersAll)
      .then((r) => r.json())
      .then((userAll) => {
        if (userAll.status !== 200) return;
        setUser(userAll.data);
        fetch(pathGetSesiAll)
          .then((rr) => rr.json())
          .then((sesiAll) => {
            if (sesiAll.status !== 200) return;
            setSesi(sesiAll.data);
            fetch(pathGetRuangAll)
              .then((rrr) => rrr.json())
              .then((ruangAll) => {
                if (ruangAll.status !== 200) return;
                if(flashUser?.jabatan !== "operator") {
                  const ru = ruangAll.data as RuangInterface[];
                  const oneRu = ru.filter(Obj => Obj.name.trim() == flashUser?.walikelas)
                  setRuangActive(oneRu[0])
                  setRuang(oneRu)
                } else { 
                  setRuangActive(ruangAll.data[0])
                  setRuang(ruangAll.data);
                }
                const s = sesiAll.data as SesiInterface[];
               
                setSesiActive(s[0]);
                const h = userAll.data.filter(
                  (Obj: UserInterface) =>
                    Obj.sesi.trim() == s[0].name.trim() &&
                    Obj.ruang.trim() == flashUser?.walikelas
                );
                setUserSelect(h);
              });
          });
      });

  }, [flashUser]);

  const calculateNilai = (iduser:number) => {
    if(!result) return 0;
    const findIndexresultId = result?.findIndex(Obj => Obj.iduser == iduser);
    if(findIndexresultId == -1) return 0;

    // const resultY = result[findIndexresultId];

    // const data: ([number, number | string | null])[] = JSON.parse(resultY.answer);

    const poin = 0;
    // const sortData = data.sort((a,b) => a[0] - b[0])

    // sortData.forEach((v:[number, number | string | null], k) => {
    //   if(!soal) return;
    //   let str = soal[k].answer;

    //   if(typeof soal[k].answer === 'string') {
    //     str = JSON.parse
    //     if (typeof soal[k].answer === 'string') {
    //         str = soal[k].answer;
    //     } else {
    //         // Handle array case, for example, by joining the array elements into a single string
    //         str = soal[k].answer; // Join the array elements with a separator
    //     }

    //     const answer = JSON.parse(str);
    //     const tipe = soal[k].tipe;
    //     if(tipe === 'pilgan' && v[1]) {
    //       if(answer.includes(v[1])) {
    //         poin += Number(soal[k].score);
    //       } else if(typeof v[1] === 'number') {
    //         if(answer.includes(alpha[v[1]])) {
    //           poin += Number(soal[k].score);
    //         }
    //       } else if(typeof v[1] === 'string') {
    //         if(answer.includes(alpha[Number(v[1])])) {
    //           poin += Number(soal[k].score);
    //         }
    //       }
    //     }
    //   }
    // })

    return poin;
  }

  useEffect(() => {
    fetch(pathGetCBTResultWithListId(Number(id)))
      .then((r) => r.json())
      .then((r) => {
        if (r.status === 200) {
          setResult(r.data);
        }
      });
  }, [id]);

  useEffect(() => {
    setUserSelect(userSelect);
  }, [userSelect]);

  const handleSession = (key: string) => {
    if (!sesiActive) return;
    const a = sesi?.filter((a) => a.name.trim() == key.trim());
    setSesiActive(a[0]);
    const us = user.filter(
      (Obj: UserInterface) =>
        Obj.sesi == key.trim() && Obj.ruang == String(ruangActive?.name).trim()
    );
    setUserSelect(us);
  };

  const handleRuang = (key: string) => {
    if (!ruangActive) return;
    const a = ruang?.filter((a) => a.name.trim() == key.trim());
    setRuangActive(a[0]);
    const us = user.filter(
      (Obj: UserInterface) =>
        Obj.ruang == key.trim() && Obj.sesi == String(sesiActive?.name).trim()
    );
    setUserSelect(us);
  };
  const handlePdfKehadiran = () => {
    Swal.fire({
      title : "Konfirmasi cetak kehadiran",
      text : "Ketikkan Nama pengawas",
      showCancelButton : true,
      cancelButtonText : "Tidak Jadi",
      confirmButtonText : "Cetak Daftar Hadir",
      input : "text",
      inputPlaceholder : "Nama Lengkap",
      inputValidator : (v) => {
        if(!v) return "Pastikan Di isi"
      }
    }).then(e => {
      if(!e.isConfirmed) return;
      if(id && sesiActive && ruangActive && flashUser) {
        const proktor = flashUser?.name
        window.location.replace(pathPrintKehadiran(id, sesiActive?.name.trim(), ruangActive?.name.trim(), proktor, e.value))
      }
    })
  }
  const handlePdfBeritaAcara = () => {
    Swal.fire({
      title : "Konfirmasi cetak kehadiran",
      text : "Ketikkan Nama pengawas",
      showCancelButton : true,
      cancelButtonText : "Tidak Jadi",
      confirmButtonText : "Cetak Daftar Hadir",
      input : "text",
      inputPlaceholder : "Nama Lengkap",
      inputValidator : (v) => {
        if(!v) return "Pastikan Di isi"
      }
    }).then(e => {
      if(!e.isConfirmed) return;
      if(id && sesiActive && ruangActive && flashUser) {
        const proktor = flashUser?.name
        window.location.replace(pathPrintKehadiran(id, sesiActive?.name.trim(), ruangActive?.name.trim(), proktor, e.value))
      }
    })
  }

  const reset = (id:number, name:string) => {
    Swal.fire({
      "title" : "Yakin Ingin Di reset Pekerjaannya ?",
      "text": "NAMA LENGKAP : " + name,
      showCancelButton: true,
      cancelButtonText : "Tidak Jadi",
      confirmButtonText : "Reset Ulang",
      input : "text",
      inputValidator : (value) => {
        if(!value) return "Maaf Tidak bisa mereset ulang";

        
        if(flashUser?.jabatan !== 'operator') {
          if(value !== "lab" + flashUser?.walikelas) return "Maaf Tidak bisa mereset Ulang"
          
          if(Number(ruangActive?.name.trim()) !== Number(flashUser?.walikelas)) return "Maaf Anda Tidak berhak mereset, silahkan reset sesuai ruang masing masing"
        } else {
          if(value !== "12345") return "Maaf Anda Tidak bisa mereset ulang"
        }
      }
    }).then(e => {
      if(!e.isConfirmed) return;
      if(!result) return;
      const idResult = result?.findIndex(Obj => Obj.iduser == id);
      if(idResult === -1) return;
      const resultId = result[idResult];
      fetch(pathRemoveResultWithId(resultId.id), {
        method : "DELETE",
        headers : { "Content-Type": "application/json"},
        body : JSON.stringify({})
      }).then(r => r.json()).then(r => {
        if(r.status !== 201) return;

        return Swal.fire({
          title : "Berhasil Di reset",
          showConfirmButton : false,
          timerProgressBar : true,
          timer: 1000,
          position : "top-right"
        })
      })
    })
  }

  return (
    <Suspense fallback="TUNGGU SEBENTAR">
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 md:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="order-2 lg:order-1 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="text-xl font-semibold uppercase">
              {userSelect?.length} dari {user?.length} Murid
            </div>

            <Table className="w-full">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">NISN</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Nilai Sementara</TableHead>
                  <TableHead className="text-right">PELANGGARAN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userSelect?.map((v, k) => (
                  <TableRow
                    key={k}
                    className={` ${
                      handleCheckStatus(v) == "finish"
                        ? "bg-green-400"
                        : handleCheckStatus(v) == "START"
                        ? "bg-blue-200"
                        : ""
                    }`}
                  >
                    <TableCell className="font-medium">{v.nisn}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{handleCheckStatus(v)} UJIAN</TableCell>
                    <TableCell>{v.photo ?? "NO"}</TableCell>
                    <TableCell>{v.kelas}</TableCell>
                    <TableCell>{calculateNilai(v.id)}</TableCell>
                    <TableCell className="text-right"><Button onClick={() => reset(v.id, v.name)}>RESET</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="order-1 lg:order-2">
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-4xl">
                    {detail?.name}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Sesi {sesiActive?.name}</div>
                  <div className="ml-auto w-full items-end gap-1">
                    <Select
                      defaultValue={sesiActive?.name.trim()}
                      onValueChange={(e) => handleSession(e)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Sesi" defaultValue={sesiActive?.name}/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sesi</SelectLabel>
                          {sesi.map((v, k) => (
                            <SelectItem key={k} value={v.name}>
                              Sesi {v.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3 mt-4">
                  <div className="font-semibold">Ruang {ruangActive?.name}</div>
                  <div className="ml-auto w-full items-end gap-1">
                    <Select
                      defaultValue={ruangActive?.name.trim()}
                      onValueChange={(e) => handleRuang(e)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Ruang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ruang</SelectLabel>
                          {ruang.map((v, k) => (
                            <SelectItem key={k} value={v.name.trim()}>
                              Ruang {v.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Button onClick={handlePdfKehadiran} className="m-2">Cetak Kehadiran</Button>
                  <Button onClick={handlePdfBeritaAcara} className="m-2">Cetak Berita Acara</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </Suspense>
  );
}
