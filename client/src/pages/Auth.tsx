import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";


export default function Auth() {
  useEffect(() => {
    document.title = "Masuk Ke AM-BK"
  }, [])
  return (
    <Suspense fallback={"Tunggu sebentar"}>
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">MASUK</h1>
                <p className="text-balance text-muted-foreground">
                Asesmen Madrasah Berbasis Komputer (AM-BK) Tahun Pelajaran 2023/2024
                </p>
            </div>
            <Outlet/>
            </div>
        </div>
        <div className="hidden bg-muted lg:block">
            <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        </div>
    </Suspense>
  )
}

