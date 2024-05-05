import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAuthorizeGuest } from "@/helper/getAuthorizeGuest";
import { getSoalOffline } from "@/helper/getSoalOffline";
import { randomingSoal } from "@/helper/randomingSoal";
import { setSoalOffline } from "@/helper/setSoalOfflne";
import { CbtInterface } from "@/lib/interface/CbtInterface";
import { RefreshToken } from "@/lib/interface/RefreshToken";
import { SoalInterface } from "@/lib/interface/SoalInterface";
import { pathGetCBTListWithId, pathGetSoalWithIdList } from "@/service/path";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Analisis = () => {
    const { id, cbtid } = useParams();
    const [soal, setSoal] = useState<Array<SoalInterface>>();
    const [pola, setPola] = useState<(number|null)[][]>([]);
    const [user, setUser] = useState<RefreshToken>();
    const [cbt, setCbt] = useState<CbtInterface>();
    const nav = useNavigate();
    useEffect(() => {
      fetch(pathGetCBTListWithId(Number(cbtid)))
        .then((r) => r.json())
        .then((r) => {
          if (r.status !== 200) return;
          const list: CbtInterface = r.data;
          if (!list) return;
          setCbt(list); // ambil data cbt detail
          const y = getAuthorizeGuest();
          setUser(y); // Ambil data user dari localstorage
  
              const [soalOffline, polaOffline] = getSoalOffline(
                String(id),
                String(cbtid)
              );
              if (soalOffline && polaOffline) {
                setPola(polaOffline);
                setSoal(soalOffline);
              } else {
                fetch(pathGetSoalWithIdList(Number(cbtid)))
                  .then((rsoal) => rsoal.json())
                  .then((rsoal) => {
                    if (rsoal.status !== 200) return;
                    const [ra, option] = randomingSoal(r.data);
                    setSoal(ra);
                    setPola(option);
                    // Belum disimpan di localstorage
                    setSoalOffline(String(id), String(cbtid), ra, option);
                  });
              }
        });
    }, [cbtid, id]);

    const backToMenu = () => {
        nav("/guest/"+ user?.nisn, { replace: true });
    }
  
    return (
      <Suspense fallback={"TUNGGU SEBENTAR"}>
        <div className="bg-slate-100 p-3 fixed items-center flex gap-3 top-0 left-0 w-full">
          <div className="w-32">{cbt?.name}</div>
          <div className="w-full text-xl font-bold text-center">
            WAKTU HABIS
          </div>
          <div className="flex gap-2">
            <Avatar title={user?.name}>
              <AvatarImage src="/client.jpeg" />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="px-4 py-10 max-w-[780px] mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle className="">Terima kasih {user?.name} sudah mengerjakan ujian {cbt?.mulai} selama {cbt?.durasi} menit.
                    
                    <p>
                        Ditunggu Hasilnya ya !..
                    </p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Berikut Hasil pengerjakan anda :
                </CardContent>
            </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {soal?.map((v, k) => (
              <Card key={k} className="m-2">
                <CardHeader>
                  <CardTitle className="text-green-500">{k + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: v.question }} />
                  <div className={"option-" + k}>
                    {v.tipe == "pilgan" && (
                      <>
                        {(typeof v.options === 'object') && v.options.map((vv: string, kk: number) => (
                          <Badge
                            key={kk}
                            variant={"outline"}
                            className={`text-md m-1 cursor-pointer badge ${
                              pola[k][1] == kk ? "bg-green-300" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: vv }}
                          ></Badge>
                        ))}
                        {(typeof v.options === 'string') && JSON.parse(v.options).map((vv: string, kk: number) => (
                          <Badge
                            key={kk}
                            variant={"outline"}
                            className={`text-md m-1 cursor-pointer badge ${
                              pola[k][1] == kk ? "bg-green-300" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: vv }}
                          ></Badge>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div onClick={() => backToMenu()} className="fixed bottom-0 left-0 w-full bg-red-100 p-3 text-center">
          KEMBALI KE HALAMAN UTAMA
        </div>
      </Suspense>
    );
  };
  