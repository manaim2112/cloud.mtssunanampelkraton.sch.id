import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAuthorizeGuest } from "@/helper/getAuthorizeGuest";
import { getSoalOffline } from "@/helper/getSoalOffline";
import { randomingSoal } from "@/helper/randomingSoal";
import { setPolaOffline } from "@/helper/setPolaOffline";
import { setSoalOffline } from "@/helper/setSoalOfflne";
import { CbtInterface } from "@/lib/interface/CbtInterface";
import { RefreshToken } from "@/lib/interface/RefreshToken";
import { ResultInterface } from "@/lib/interface/ResultInterface";
import { SoalInterface } from "@/lib/interface/SoalInterface";
import { pathCheckingResultTime, pathFinishCBT, pathGetCBTListWithId, pathGetSoalWithIdList } from "@/service/path";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const CBTTest = () => {
    const { id, cbtid } = useParams();
    const [soal, setSoal] = useState<Array<SoalInterface>>();
    const [pola, setPola] = useState<(number|null)[][]>([]);
    const [user, setUser] = useState<RefreshToken>();
    const [cbt, setCbt] = useState<CbtInterface>();
    const [time, setTime] = useState<number>(0);
    const nav = useNavigate();
    // const [socket, setSocket] = useState<WebSocket>();
    // useEffect(() => {
    //   const ws = new WebSocket(WS_URL(Number(id)));
    //   setSocket(ws);
    //   ws.onopen = () => {
    //     console.log("Connected to WebSocket server");
    //   };
  
    //   ws.onmessage = (event) => {
    //     console.log("Received message:", event.data);
    //   };
  
    //   ws.onclose = () => {
    //     console.log("Connection to WebSocket server closed");
    //   };
  
    //   return () => {
    //     ws.close();
    //   };
    // }, [id]);
    const sendMessage = (up:(number|null)[][]) => {
      console.log(up);
      // if (socket) {
      //   const count = up.filter(e => e[1] !== null).length;
      //   // socket.send("guest-" + cbtid +"-" + user?.id + "-" + count);
      // }
    };
    const takefinish = () => {
      const [soalOffline, polaOffline] = getSoalOffline(String(id), String(cbtid))
      console.log(soalOffline)
      let error = 0;
      if(!polaOffline) return;
      polaOffline.forEach(v => {
        if(!v[1]) {
          error++;
        }
      })

      if(error > 0) return Swal.fire("Pastikan semua Di kerjakan");

      const data:ResultInterface = {
        id : 0,
        idlist : Number(cbtid),
        iduser : Number(user?.id),
        process : "FINISH",
        answer : JSON.stringify(polaOffline),
        score : 0,
        created_at : ""
      }
      Swal.fire({
        title : "Yakin Ingin Selesai ?",
        text : "Pastikan Di cek semuanya",
        showCancelButton : true
      }).then(e => {
        if(!e.isConfirmed) return;
        fetch(pathFinishCBT, {
          method : "put", 
          headers : { "Content-Type": "application/json"},
          body : JSON.stringify(data)
        }).then(r=>r.json()).then(res =>  {
          console.log(res)
          if(res.status !== 201) {
            Swal.fire("error", "", "error")
          } else {
            nav("/guest/" + id + "/cbt/" + cbtid + "/analisis")
          }
        })

      })
    }
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
  
          fetch(pathCheckingResultTime(y.id, Number(cbtid)))
            .then((r) => r.json())
            .then((rchecking) => {
              if (rchecking.status !== 200) return;
              const { current_time, created_at } = rchecking;
              const timestampWithoutZ = created_at.slice(0, -1) + "+07:00";
  
              const dateNow = Date.parse(current_time);
              const dateStart = Date.parse(timestampWithoutZ);
              if (!list.durasi) return;
              const total = dateStart + Number(r.data.durasi) * 60*1000;
              const difftotal = total-dateNow;
              // JIka waktu habis maka langsung di hentikan
              if(difftotal < 0) {
                const [soalOffline, polaOffline] = getSoalOffline(String(id), String(cbtid))
                console.log(soalOffline)
                const data:ResultInterface = {
                    id : 0,
                    idlist : Number(cbtid),
                    iduser : Number(user?.id),
                    process : "FINISH",
                    answer : JSON.stringify(polaOffline),
                    score : 0,
                    created_at : ""
                }
                fetch(pathFinishCBT, {
                    method : "put", 
                    headers : { "Content-Type": "application/json"},
                    body : JSON.stringify(data)
                }).then(r=>r.json()).then(res =>  {
                    console.log(res)
                    if(res.status !== 201) {
                        Swal.fire("error", "", "error")
                    } else {
                        nav("/guest/" + id + "/cbt/" + cbtid + "/analisis")
                    }
                })
              }
              setTime(difftotal); // Ambil waktu yang terbuang dari server
  
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
        });
    }, [cbtid, id]);
  
    const handleSoal = (
      i: number,
      key: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (pola) {
        const updatedPola = [...pola]; // Salin array pola
  
        const index = updatedPola.findIndex((obj) => obj[0] == i);
        if (index !== -1) {
          updatedPola[index][1] = key;
          setPola(updatedPola); // Perbarui state dengan nilai yang diperbarui
          setPolaOffline(String(id), String(cbtid), updatedPola);
          sendMessage(updatedPola);
  
  
          // Hapus warna hijau dari semua opsi kecuali yang saat ini dipilih
          const allOptions = document.querySelectorAll(
            ".option-" + key + " .badge"
          );
          allOptions.forEach((option) => {
            option.classList.remove("bg-green-300");
          });
  
          const targetElement = event.target as HTMLElement;
          // Tambahkan warna hijau ke opsi yang saat ini dipilih
          targetElement.classList.add("bg-green-300");
        }
      }
    };
  
    return (
      <Suspense fallback={"TUNGGU SEBENTAR"}>
        <div className="bg-slate-100 p-3 fixed items-center flex gap-3 top-0 left-0 w-full">
          <div className="w-32">{cbt?.name}</div>
          <div className="w-full text-xl font-bold text-center">
            <Countdown time={String(time)} />
          </div>
          <div className="flex gap-2">
            <Avatar title={user?.name}>
              <AvatarImage src="/client.jpeg" />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="px-4 py-10 max-w-[780px] mx-auto mt-10">
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
                            onClick={(event) => handleSoal(v.id, kk, event)}
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
                            onClick={(event) => handleSoal(v.id, kk, event)}
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
        <div onClick={() => takefinish()} className="fixed bottom-0 left-0 w-full bg-red-100 p-3 text-center">
          SELESAI
        </div>
      </Suspense>
    );
  };
  
  export const Countdown = (props: { time: string; }) => {
    const [totalSeconds, setTotalSeconds] = useState(parseInt(props.time));
  
    useEffect(() => {
      setTotalSeconds(parseInt(props.time));
    }, [props.time]);
  
    useEffect(() => {
      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        const interval = setInterval(() => {
          setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [totalSeconds]);
  
    const minutes = Math.floor(totalSeconds / (60*1000));
    const seconds = totalSeconds % 60;
  
    return (
      <Suspense>
        {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </Suspense>
    );
  };