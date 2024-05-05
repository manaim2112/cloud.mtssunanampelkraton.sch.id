import { ChevronLeft, ChevronRight, File, ListFilter, MoreVertical, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ReactNode, startTransition, Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { pathCBTListAll, pathCountCBTList, pathCountUsers, pathInsertCBTList } from "@/service/path";
import { CbtInterface } from "@/lib/interface/CbtInterface";
import { getAuthorizeAdmin } from "@/helper/getAuthorizeAdmin";
import { RefreshAdmin } from "@/lib/interface/RefreshAdmin";
import Swal from "sweetalert2";
import { randomText } from "@/helper/randomText";

export function ListCountContent() {
  const [count, setCount] = useState({
    cbt: 0,
    user: 0,
  });
  const nav = useNavigate();

  const handleCreateUjian = () => {
    Swal.fire({
      "title" : "Ketikkan Nama Ujian",
      "confirmButtonText" : "Buat Ujian",
      "input" : "text",
      "inputAutoTrim" : true,
      "inputValidator" : (v) => {
        if(!v) return "Pastikan di isi";
      }
    }).then(e => {
      if(!e.isConfirmed) return;
      fetch(pathInsertCBTList, {
        method : "POST",
        headers : { "Content-Type": "application/json"},
        body : JSON.stringify({
          "name" : e.value.trim(),
          "jenis" : "AMBK",
          "durasi" : "50",
          "min_durasi" : "50",
          "code" : randomText(3),
          "tokelas" : "9A, 9B, 9C, 9D, 9E, 9F, 9G",
          "creator" : 1
        })
      }).then(r=>r.json()).then(response => {
        if(response.status === 201) {
          nav("/dashboard", {replace : true})
        }
      })
    })
  }

  const [user] = useState<RefreshAdmin|null>(getAuthorizeAdmin())

  useEffect(() => {
    startTransition(() => {
      fetch(pathCountUsers).then(r=>r.json()).then(r => {
        if(r.status === 200) {
          const c = count;
          c.user = r.count;
          setCount(c);
        }
      })

      fetch(pathCountCBTList).then(r=>r.json()).then(r => {
        if(r.status === 200) {
          const c = count;
          c.cbt = r.count;
          setCount(c);
        }
      })
    })



  }, [count]);
  return (
    <Suspense fallback={"Tunggu Sebentar"}>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle className="uppercase">{user?.name}</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Selamat datang kembali di tempat managemen ujian berbasis semi
              offline, anda bisa menambahkan UJIAN melalui tombol dibawah ini
            </CardDescription>
          </CardHeader>
          <CardFooter>
            {
              user?.jabatan == "operator" && (
                <Button onClick={() => handleCreateUjian()}>Buat Ujian Baru</Button>
              )
            }
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Total Mapel</CardDescription>
            <CardTitle className="text-4xl">{count.cbt}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">di tahun ini</div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Total Peserta didik</CardDescription>
            <CardTitle className="text-4xl">{count.user}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
}



export const TableMapel = (props: {
  mapel: Array<CbtInterface>;
  children: ReactNode;
}) => {
  const mapel = props.mapel;
  const nav = useNavigate();

  const handleLink = (id: number) => {
    nav("/dashboard/cbt/id/" + id);
  };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>{props.children}</CardTitle>
        <CardDescription>Klik Kanan pada Mapel untuk action</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead className="hidden sm:table-cell">
                JENIS UJIAN
              </TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                PELAKSANAAN
              </TableHead>
              <TableHead className="text-right">DURASI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mapel.map((v, k) => (
              <TableRow
                key={k}
                onClick={() => handleLink(v.id)}
                className="bg-accent"
              >
                <TableCell>
                  <div className="font-medium">{v.name}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {v.jenis}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {v.priority ? (
                    <Badge className="text-xs" variant="outline">
                      AKTIF
                    </Badge>
                  ) : (
                    <Badge className="text-xs" variant="outline">
                      TIDAK AKTIF
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {v.mulai ? v.mulai : <>BELUM SET</>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {v.min_durasi} menit
                  </div>
                  <div>{v.durasi} menit</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export function TabsMapel(prop: { mapel: CbtInterface[] }) {
  const { mapel } = prop;

  return (
    <Tabs defaultValue="active">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="nonactive">TIDAK AKTIF</TabsTrigger>
          <TabsTrigger value="active">AKTIF</TabsTrigger>
          <TabsTrigger value="all">SEMUA</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value="nonactive">
        <TableMapel mapel={mapel.filter((p) => p.priority !== true)}>
          MAPEL <span className="text-red-600">TIDAK AKTIF</span>
        </TableMapel>
      </TabsContent>
      <TabsContent value="active">
        <TableMapel mapel={mapel.filter((p) => p.priority == true)}>
          MAPEL <span className="text-green-600">AKTIF</span>
        </TableMapel>
      </TabsContent>
      <TabsContent value="all">
        <TableMapel mapel={mapel}>
          MAPEL <span className="text-blue-600">SEMUA</span>
        </TableMapel>
      </TabsContent>
    </Tabs>
  );
}
export const DetailActive = (props: { mapel: CbtInterface[] }) => {
  const { mapel } = props;
  const [selection, setSelection] = useState<CbtInterface>();
  const [keySelect, setKeySelect] = useState<number>(0);
  const nav = useNavigate();

  useEffect(() => {
    if(mapel.length > 0) {
      setSelection(mapel[keySelect])
    }
  }, [mapel, keySelect])

  const handle = (key:number) => {
    const selected = keySelect+key;
    if(mapel[selected]) {
      setKeySelect(selected);
    } else if(selected < 0) {
      setKeySelect(mapel.length-1)
    } else {
      setKeySelect(0);
    }
  }
  return (
    <>
      {
        mapel.length > 0 ? (
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-col lg:flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {selection?.name}
                </CardTitle>
                <CardDescription>Date: {selection?.mulai}</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button onClick={() => nav("/dashboard/cbt/id/" + selection?.id)} size="sm" variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    LACAK PEKERJAAN PESERTA
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Hapus</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="text-6xl font-bold">{selection?.code}</div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">{ selection ? atob(selection?.created_at) : ""}</time>
              </div>
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" onClick={() => handle(-1)} variant="outline" className="h-6 w-6">
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only">Previous Order</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" onClick={() => handle(1)} variant="outline" className="h-6 w-6">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Next Order</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        ) : (
          <>
            <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  TIDAK ADA UJIAN YANG AKTIF
                </CardTitle>
                <CardDescription>Date: {Date.now()}</CardDescription>
              </div>
              </CardHeader>
            </Card>
          </>
        )
      }
    </>
  );
};



export default function Dashboard() {
  const [mapel, setMapel] = useState<Array<CbtInterface>>([]);
  useEffect(() => {
    startTransition(() => {
      fetch(pathCBTListAll).then(r=>r.json()).then(r => {
        if(r.status === 200) {
          setMapel(r.data)
        }
      })
    })
  }, []);
  return (
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
            <ListCountContent />
            <TabsMapel mapel={mapel} />
          </div>
          <div className="order-1 lg:order-2">
            <DetailActive mapel={mapel.filter((Obj) => Obj.priority == true)} />
          </div>
        </main>
      </div>
    </div>
    </Suspense>
  );
}
