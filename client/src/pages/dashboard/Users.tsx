import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { pathCreateRuang, pathCreateSesi, pathGetKelasAll, pathGetRuangAll, pathGetSesiAll, pathGetUsersAll, pathInsertKelas} from "@/service/path";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInterface } from "@/lib/interface/UserInterface";
import { KelasInterface } from "@/lib/interface/KelasInterface";
import { SesiInterface } from "@/lib/interface/SesiInterface";
import { RuangInterface } from "@/lib/interface/RuangInterface";

export const Users = () => {
  const [kelas, setKelas] = useState<Array<KelasInterface>>([]);
  const [ruang, setRuang] = useState<Array<RuangInterface>>([]);
  const [sesi, setSesi] = useState<Array<SesiInterface>>([]);
  const [user, setUser] = useState<Array<UserInterface>>([]);
  const [data, setData] = useState<Array<UserInterface>>([]);
  const [kelasActive, setKelasActive] = useState<string>("");

  useEffect(() => {
    fetch(pathGetKelasAll)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === 200) {
          setKelas(d.data);
          if (d.data.length > 0) {
            const active = d.data[0].name;
            setKelasActive("Kelas " + active);
            fetch(pathGetUsersAll)
              .then((r) => r.json())
              .then((t) => {
                if (t.status === 200) {
                  setData(t.data);

                  const tt = t.data.filter(
                    (Obj: UserInterface) => Obj.kelas == active
                  );
                  console.log(d.data[0].name);
                  setUser(tt);
                }
              });
          }
        }
      });

    fetch(pathGetSesiAll)
      .then((r) => r.json())
      .then((r) => {
        console.log("SESI", r);
        if (r.status === 200) {
          setSesi(r.data);
        }
      });

    fetch(pathGetRuangAll)
      .then((r) => r.json())
      .then((r) => {
        console.log("RUANG", r);
        if (r.status === 200) {
          setRuang(r.data);
        }
      });
  }, []);

  const handleForm = (event: HTMLInputElement) => {
    const target = event as HTMLInputElement;
    if (!target.name || !target.value) return;
    if (target.value.includes(" ")) {
      target.value = "";
      if (target.name === "kelas") {
        fetch(pathInsertKelas, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kode: target.value.trim(),
            name: target.value.trim(),
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.status === 201) {
              setKelas((ke) => [
                ...ke,
                { id: 10, kode: target.value, name: target.value },
              ]);
            }
          });
      }

      if (target.name === "ruang") {
        fetch(pathCreateRuang, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: target.value }),
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.status === 201) {
              setRuang((ke) => [...ke, { id: 10, name: target.value }]);
            }
          });
      }

      if (target.name === "sesi") {
        fetch(pathCreateSesi, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: target.value }),
        })
          .then((r) => r.json())
          .then((r) => {
            console.log(r);
            if (r.status === 201) {
              setSesi((ke) => [...ke, { id: 10, name: target.value }]);
            }
          });
      }
    }
  };
  const handleSelect = (value: string) => {
    //   const { value } = event.target;
    const [s, v] = value.split(" ");
    if (s === "k") {
      const d = data.filter((Obj) => Obj.kelas == v);
      console.log(d, data);
      setKelasActive("Kelas " + v);
      setUser(d);
    }

    if (s === "r") {
      const d = data.filter((Obj) => Obj.ruang == v);
      setKelasActive("Ruang " + v);
      setUser(d);
    }
    if (s === "s") {
      const d = data.filter((Obj) => Obj.sesi == v);
      setKelasActive("Sesi " + v);
      setUser(d);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 md:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="text-xl font-semibold uppercase">
              {user.length} dari {data.length} Murid
            </div>
            <Table className="w-full">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">NISN</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Sandi</TableHead>
                  <TableHead>Ruang</TableHead>
                  <TableHead>Sesi</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead className="text-right">Photo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.map((v, k) => (
                  <TableRow key={k}>
                    <TableCell className="font-medium">{v.nisn}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.pass}</TableCell>
                    <TableCell>{v.ruang}</TableCell>
                    <TableCell>{v.sesi}</TableCell>
                    <TableCell>{v.kelas}</TableCell>
                    <TableCell className="text-right">{v.photo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-col lg:flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-4xl">
                    {kelasActive}
                  </CardTitle>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Pilih Kelas, Ruang, Sesi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>KELAS</SelectLabel>
                        {kelas.map((v, k) => (
                          <SelectItem key={k} value={"k " + v.name}>
                            kelas {v.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>RUANG</SelectLabel>
                        {ruang.map((v, k) => (
                          <SelectItem key={k} value={"r " + v.name}>
                            ruang {v.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>SESI</SelectLabel>
                        {sesi.map((v, k) => (
                          <SelectItem key={k} value={"s " + v.name}>
                            sesi {v.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">USER DETAIL</div>
                  <ul className="grid gap-3">
                    <li className="">
                      <span className="text-muted-foreground me-3">
                        KELAS
                      </span>
                      <span>
                        {kelas.map((v, k) => (
                          <Badge
                            variant={"outline"}
                            key={k}
                            className="space-x-2 m-1"
                          >
                            {v.name}
                          </Badge>
                        ))}
                        <div className="mt-3">
                          <Label className="text-sm">
                            Ketikkan Kelas lalu enter untuk menambah
                          </Label>
                          <Input
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => handleForm(e.target as HTMLInputElement)}
                            name="kelas"
                            type="text"
                            placeholder="9A"
                          />
                        </div>
                      </span>
                    </li>
                    <li className="">
                      <span className="text-muted-foreground">RUANG</span>
                      <span>
                        {ruang.map((v, k) => (
                          <Badge
                            variant={"outline"}
                            key={k}
                            className="space-x-2 m-1"
                          >
                            RUANG {v.name}
                          </Badge>
                        ))}
                        <div className="mt-3">
                          <Label className="text-sm">
                            Ketikkan Ruang lalu enter untuk menambah
                          </Label>
                          <Input
                            type="text"
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => handleForm(e.target as HTMLInputElement)}
                            name="ruang"
                            placeholder="1"
                          />
                        </div>
                      </span>
                    </li>
                    <li className="">
                      <span className="text-muted-foreground me-3">SESI</span>
                      <span>
                        {sesi.map((v, k) => (
                          <Badge
                            variant={"outline"}
                            key={k}
                            className="space-x-2 m-1"
                          >
                            SESI {v.name}
                          </Badge>
                        ))}
                        <div className="mt-3">
                          <Label className="text-sm">
                            Ketikkan Sesi lalu enter untuk menambah
                          </Label>
                          <Input
                            type="text"
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => handleForm(e.target as HTMLInputElement)}
                            name="sesi"
                            placeholder="1"
                          />
                        </div>
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
