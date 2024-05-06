import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {pathCheckingResult, pathGetCBTListAll, pathGetResultWithUserId, pathGetSoalWithIdList, pathStartCBT } from "@/service/path";
import Swal from "sweetalert2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { CbtInterface } from "@/lib/interface/CbtInterface";
import { ResultInterface } from "@/lib/interface/ResultInterface";
import { getAuthorizeGuest } from "@/helper/getAuthorizeGuest";
import { getSoalOffline } from "@/helper/getSoalOffline";
import { randomingSoal } from "@/helper/randomingSoal";
import { setSoalOffline } from "@/helper/setSoalOfflne";
import { transformToPola } from "@/helper/transformToPola";
import { RefreshToken } from "@/lib/interface/RefreshToken";


export const ListMapelNow = (prop: {
  mapel: CbtInterface[];
  user: string;
  userid: number;
}) => {
  const { mapel, user, userid } = prop;
  const nav = useNavigate();
  const handle = async (id: number) => {
    const i = mapel.findIndex((Obj) => Obj.id === id);
    if (i == -1) return;
    const data = mapel[i];
    const { value: ipAddress } = await Swal.fire({
      title: "MASUKKAN KODE UJIAN",
      input: "text",
      inputLabel: "NAMA UJIAN : " + data.name,
      inputPlaceholder: "XXX",
      html: "Kode ujian diberikan oleh petugas proktor",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Pastikan masukkan yang benar";
        }

        if (data.code !== value) {
          return "Kode yang dimasukkan salah";
        }
      },
    });
    if (!ipAddress) return;
    const checkResult = await (
      await fetch(pathCheckingResult(Number(userid), data.id))
    ).json();
    const result: ResultInterface = {
      id: 0,
      idlist: data.id,
      iduser: userid,
      process: "START",
      score: 0,
      answer: JSON.stringify([]),
      created_at: "",
    };
    const [s, p] = getSoalOffline(user, String(data.id));
    if (checkResult.data.length < 1) {
      if (p) {
        result.answer = JSON.stringify(p);
        await fetch(pathStartCBT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });
        setSoalOffline(user, String(data.id), s, p);
      } else {
        const anotherSoal = await (
          await fetch(pathGetSoalWithIdList(Number(data.id)))
        ).json();
        const [ra, option] = randomingSoal(anotherSoal.data);
        result.answer = JSON.stringify(option);
        await fetch(pathStartCBT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });
        setSoalOffline(user, String(data.id), ra, option);
      }
    } else {
      const anotherSoal = await (
        await fetch(pathGetSoalWithIdList(Number(data.id)))
      ).json();
      if (!p) {
        const [ra, option] = randomingSoal(anotherSoal.data);

        setSoalOffline(user, String(data.id), ra, option);
      } else {
        const convert = transformToPola(anotherSoal.data, p);
        setSoalOffline(user, String(data.id), convert, p);
      }
    }

    nav("/guest/" + user + "/cbt/" + data.id);
    Swal.fire({
      title: "SELAMAT MENGERJAKAN",
      timerProgressBar: true,
      timer: 3000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className="text-3xl font-bold">UJIAN HARI INI</div>
      <div>
        {mapel
          .filter((Obj) => Obj.priority == true)
          .map((v, k) => (
            <Card onClick={async () => await handle(v.id)} key={k}>
              <CardHeader>
                <CardTitle>{v.name}</CardTitle>
                <CardDescription>{v.jenis}</CardDescription>
              </CardHeader>
              <CardContent>Dimulai {v.mulai}</CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default function IndexGuest() {
  const [user, setUser] = useState<RefreshToken>({
    id: 0,
    created_at: "",
    kelas: "",
    name: "",
    nisn: "",
    pass: "",
    photo: "",
    ruang: "",
    sesi: "",
  });
  const [mapel, setMapel] = useState<CbtInterface[]>([]);
  const [result, setResult] = useState<Array<ResultInterface>>([]);

  useEffect(() => {
    const auth = getAuthorizeGuest();
    fetch(pathGetCBTListAll)
      .then((r) => r.json())
      .then((r) => {
        if (r.status === 200) {
          setMapel(r.data);
          if (auth) {
            fetch(pathGetResultWithUserId(auth.id))
              .then((r) => r.json())
              .then((rr) => {
                if (rr.status === 200) {
                  setResult(rr.data);
                }
              });
          }
        }
      });
    return setUser(auth);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div>
              <div className="text-5xl font-medium">{user?.name}</div>
              <div className="text-xl">Kelas {user?.kelas}</div>
              <div>
                <Badge>SESI {user?.sesi}</Badge>{" "}
                <Badge variant={"outline"}>RUANG {user?.ruang}</Badge>
              </div>
            <div className="mt-8">
              <Link className="bg-red-500 rounded-lg px-3 py-4" to="/">KELUAR</Link>

            </div>
            </div>

            <Alert variant={"destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>PERHATIAN</AlertTitle>
              <AlertDescription>
                Pastikan Anda mematuhi peraturan berikut :
                <ul className="list-decimal">
                  <li>
                    Tidak mengaktifkan Data Internet (untuk yang membawa hp)
                  </li>
                  <li>
                    Pastikan Jam di hp/komputer sesuai dengan jam saat ini
                  </li>
                  <li>
                    Hindari layar hp sleep atau mati, pastikan tetap menyala
                    saat mengerjakan
                  </li>
                  <li>
                    Mulailah dengan membaca basmalah dan berdoa sebelum
                    mengerjakan
                  </li>
                  <li>
                    Pengerjaan hanya di lakukan satu kali, tidak bisa beberapa
                    kali
                  </li>
                  <li>Jika Ada pertanyaan, bisa langsung ke Proktor kelas</li>
                </ul>
              </AlertDescription>
            </Alert>
            <ListMapelNow mapel={mapel} user={user?.nisn} userid={user?.id} />
          </div>
          <div className="bg-white shadow rounded-lg p-3">
            <div className="text-lg uppercase text-center font-bold">
              Semua mapel Ujian
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Mapel</TableHead>
                  <TableHead>Mulai</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mapel.map((v, k) => (
                  <TableRow
                    className={
                      result.find((Obj) => Obj.idlist == v.id && Obj.process == "START")
                        ? "bg-blue-300 animate-pulse"
                        : result.find((Obj) => Obj.idlist == v.id && Obj.process == "finish") ? "bg-green-500" : "bg-white"
                    }
                    key={k}

                    
                  >
                    <TableCell>{k + 1}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.mulai}</TableCell>
                    <TableCell>
                      {
                        result.find(Obj => Obj.idlist == v.id && Obj.process == "START") ? "SEDANG MENGERJAKAN" : result.find((Obj) => Obj.idlist == v.id && Obj.process == "finish") ? "SELESAI" :  "BELUM DI KERJAKAN"
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}



