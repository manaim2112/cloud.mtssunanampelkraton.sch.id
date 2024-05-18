import { ResultInterface } from "@/lib/interface/ResultInterface";
import { SoalInterface } from "@/lib/interface/SoalInterface";
import { pathGetResultWithUserIdAndListId, pathGetSoalWithIdList } from "@/service/path";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function ResultUser() {
    const {id, iduser} = useParams();
    const [soal, setSoal] = useState<SoalInterface[]>()
    const [result, setResult] = useState<Array<[number, number|null]>>()
    const [alpha] = useState<string[]>("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))
    useEffect(() => {
        fetch(pathGetSoalWithIdList(Number(id))).then(r=> r.json()).then(res => {
            if(res.status !== 200) return;
            setSoal(res.data);
        })
    }, [])

    useEffect(() => {
        fetch(pathGetResultWithUserIdAndListId(Number(iduser), Number(id))).then(r => r.json()).then(res => {
            if(res.status !== 200) return;
            const Result = res.data as ResultInterface;
            const parseResult: Array<[number, number|null]> = JSON.parse(Result.answer);
            const sortResult = parseResult.sort((a,b) => a[0] - b[0]);

            setResult(sortResult);
        })
        console.log(result, alpha);
    }, [])


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
                    { soal?.map((e, k) => (
                        <Card key={k} className="mb-2">
                            <CardHeader>
                                <CardTitle>
                                    {k + 1}{" "}
                                    <Badge variant={"secondary"}>
                                    <Plus className="w-4 h-4" /> {e.score}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    <div dangerouslySetInnerHTML={{ __html: e.question }}></div>
                                </CardDescription>
                                <CardContent>
                                    {/* {e.tipe == "pilgan" && (
                                        <>
                                        {typeof e.answer === "string" && JSON.parse(e.answer).map((ej:string, ek:number) => (
                                            <Badge
                                            key={ek}
                                            className="mx-2 w-full"
                                            variant={
                                                e.answer.includes(alphabet[ek]) || e.kunci.includes(ek)
                                                ? "default"
                                                : "outline"
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: alphabet[ek] + ".  " + ej,
                                            }}
                                            ></Badge>
                                        ))}
                                        </>
                                    )} */}
                                    </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="order-1 lg:order-2">
                </div>
                </main>
            </div>
            </div>
        </Suspense>
    )
}