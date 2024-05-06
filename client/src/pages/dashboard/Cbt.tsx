import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React, {startTransition, Suspense, useEffect, useState } from "react";
import { pathChangePriorityCBTList, pathGetCBTListWithId, pathGetSoalWithIdList, pathUpdateCBTList } from "@/service/path";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Plus, Truck, UploadCloud } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HTML, save } from "@/service/cbt";
import { Switch } from "@/components/ui/switch";
import Swal from "sweetalert2";
import { CbtInterface } from "@/lib/interface/CbtInterface";

const UpdateSetting = (props: { detail: CbtInterface | undefined }) => {
  const { detail } = props;
  const [data, setData] = useState({
    id: detail?.id,
    name: detail?.name,
    durasi: detail?.durasi,
    min_durasi: detail?.min_durasi,
    jenis: detail?.jenis,
    tokelas: detail?.tokelas,
  });
  useEffect(() => {
    setData({
      id: detail?.id,
      name: detail?.name,
      durasi: detail?.durasi,
      min_durasi: detail?.min_durasi,
      jenis: detail?.jenis,
      tokelas: detail?.tokelas,
    });
  }, [detail]);
  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(pathUpdateCBTList, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        jenis: data.jenis,
        durasi: data.durasi,
        min_durasi: data.min_durasi,
        tokelas: data.tokelas,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status === 201) {
          alert("Berhasil Melakukan Perubahan");
        } else {
          alert("Gagal melakukan Perubahan");
        }
      });
  };
  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button variant="outline">PERUBAHAN</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Perubah Ujian</DialogTitle>
          <DialogDescription>
            Anda Dapat merubah pengaturan ujian disini, jika sudah selesai
            melakukan perubahan, klik tombol selesai.
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-2 text-start mt-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Nama Ujian</Label>
            <Input
              id="name"
              name="name"
              onInput={handleForm}
              type="text"
              placeholder="Nama ujian"
              defaultValue={detail?.name}
              required
            />
          </div>
        </div>
        <div className="space-x-2 text-start mt-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Masa Pengerjaan</Label>
            <Input
              id="name"
              name="durasi"
              onInput={handleForm}
              type="text"
              placeholder="Nama ujian"
              defaultValue={detail?.durasi}
              required
            />
          </div>
        </div>
        <div className="space-x-2 text-start mt-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Min Masa Pengerjaan</Label>
            <Input
              id="name"
              name="min_durasi"
              onInput={handleForm}
              type="text"
              placeholder="Nama ujian"
              defaultValue={detail?.min_durasi}
              required
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start mt-4">
          <Button onClick={handleSubmit} type="button">
            SIMPAN
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function Cbt() {
  const { id } = useParams();
  const [html, setHtml] = useState<Array<HTML>>();
  const [detail, setDetail] = useState<CbtInterface>({
    id: 0,
    acak: true,
    name: "",
    berakhir: "",
    code: "",
    created_at: "",
    creator: 0,
    durasi: "",
    jenis: "",
    min_durasi: "",
    mulai: "",
    priority: true,
    tokelas: "",
    updated_at: "",
  });
  const [alphabet] = useState<Array<string>>(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  );
  const nav = useNavigate();

  const handleLacak = () => {
    nav("/dashboard/cbt/id/" + id + "/lacak");
  };
  useEffect(() => {
    startTransition(() => {
      fetch(pathGetSoalWithIdList(Number(id)))
        .then((r) => r.json())
        .then((res) => {
          if (res.status === 200) {
            const data: HTML[] = [];
            res.data.forEach(
              (v: {
                id: number;
                question: string;
                tipe: string;
                options: string;
                answer: string;
                score: string;
              }) => {
                data.push({
                  id: v.id,
                  soal: v.question,
                  tipe: v.tipe,
                  jawaban: JSON.parse(v.options),
                  kunci: JSON.parse(v.answer),
                  skor: Number(v.score),
                });
              }
            );
            setHtml(data);
          }
        });
  
      fetch(pathGetCBTListWithId(Number(id)))
        .then((r) => r.json())
        .then((res) => {
          if (res.status === 200) {
            setDetail(res.data);
          }
        });
    })
  }, [id]);

  const handleUpload = () => {
    // Buat elemen input file
    const inputElement = document.createElement("input");
    inputElement.type = "file";

    // Tambahkan event listener untuk saat perubahan
    inputElement.addEventListener("change", (event: Event) => {
      // event.preventDefault();
      const target = event.target as HTMLInputElement;
      const file = target?.files?.[0];
      console.log(file)
      if (!file) return;
      inputElement.remove();
      const reader = new FileReader();
      reader.onload = (ev) => {
        interface MammothResponse {
          value: string; // Tipe dari value (HTML)
          messages: string[]; // Tipe dari messages (Array of strings)
        }

        const arrayBuffer = ev.target?.result;
        mammothPlus
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(({ value }: MammothResponse) => {
            const ht = document.createElement("div");
            ht.innerHTML = value;
            const tr = ht.querySelectorAll(
              "table > tbody > tr:not(td table tr)"
            );
            const element: Array<HTML> = [];
            tr.forEach((v) => {
              const td = v.querySelectorAll("td");
              const li: Array<string> = [];
              td[3].querySelectorAll("li").forEach((v) => {
                li.push(v.innerHTML);
              });
              const item:HTML = {
                id:1,
                soal: td[1].innerHTML,
                tipe: td[2].innerText.toLowerCase(),
                jawaban: li,
                kunci: td[4].innerText.split("|"),
                skor: Number(td[5].innerText),
              };
              element.push(item);
            });
            element.shift();
            if (id) {
              setHtml([]);
              console.log("TEST")
              save(element, id).then((r) => {
                if (r) {
                  setHtml(element);
                  alert("BERHASIL DI UPLOAD");
                }
              });
            }
          })
          .then(MathJax.typeset)
      };
      reader.readAsArrayBuffer(file);
    });

    // Tambahkan elemen input file ke dalam dokumen
    document.body.appendChild(inputElement);

    // Klik elemen input file
    inputElement.click();
  };

  const handlePriority = (i: boolean) => {
    fetch(pathChangePriorityCBTList, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: detail?.id, priority: i }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.status === 201) {
          const u: CbtInterface = { ...detail };
          u.priority = i;
          setDetail(u);
          Swal.fire({
            title: "Berhasil",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            position: "top-right",
          });
        }
      });
  };

  return (
    <Suspense fallback={"Tunggu Sebentar"}>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid order-2 lg:order-1 grid-cols-1 lg:grid-cols-2 items-start gap-4 md:gap-8 lg:col-span-2">
            {html?.map((v, k) => (
              <Card key={k} className="w-full text-start">
                <CardHeader>
                  <CardTitle>
                    {k + 1}{" "}
                    <Badge variant={"secondary"}>
                      <Plus className="w-4 h-4" /> {v.skor}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <div dangerouslySetInnerHTML={{ __html: v.soal }}></div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {v.tipe == "pilgan" && (
                    <>
                      {v.jawaban.map((vj, vk) => (
                        <Badge
                          key={vk}
                          className="mx-2"
                          variant={
                            v.kunci.includes(alphabet[vk]) || v.kunci.includes(vk)
                              ? "default"
                              : "outline"
                          }
                          dangerouslySetInnerHTML={{
                            __html: alphabet[vk] + " " + vj,
                          }}
                        ></Badge>
                      ))}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-7">
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-col lg:flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {detail?.name}

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>

                  <CardDescription>{detail?.jenis}</CardDescription>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <Button
                    onClick={handleLacak}
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                  >
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Lacak Pengerjaan
                    </span>
                  </Button>
                  <Button
                    onClick={handleUpload}
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                  >
                    <UploadCloud className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Upload
                    </span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">UJIAN DETAIL</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Mata Pelajaran <span>2</span>
                      </span>
                      <span>{detail?.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Jenis Ujian <span>1</span>
                      </span>
                      <span>{detail?.jenis}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Masa Pengerjaan <span>1</span>
                      </span>
                      <span>{detail?.durasi} menit</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Minimal Masa Pengerjaan <span>1</span>
                      </span>
                      <span>{detail?.min_durasi} menit</span>
                    </li>
                  </ul>

                  <UpdateSetting detail={detail} />

                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Tanggal Mulai
                      </span>
                      <span>
                        {detail?.mulai ? (
                          detail.mulai
                        ) : (
                          <Badge variant={"outline"}>Belum di set</Badge>
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Tanggal Berakhir
                      </span>
                      <span>
                        {detail?.berakhir ? (
                          detail.berakhir
                        ) : (
                          <Badge variant={"outline"}>Belum di set</Badge>
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">FORMAT ACAK</span>
                      <span>{detail?.acak ? "YA" : "TIDAK"}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">KODE UJIAN</span>
                      <span className="text-3xl">{detail?.code}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated{" "}
                  <time dateTime="2023-11-23">
                    {detail?.updated_at
                      ? atob(detail.updated_at)
                      : "NOT BE SET"}
                  </time>
                </div>
                <div className="ml-auto mr-0 w-auto">
                  <Switch
                    checked={detail?.priority !== null ? detail.priority : false}
                    onCheckedChange={handlePriority}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </Suspense>
  );
}
