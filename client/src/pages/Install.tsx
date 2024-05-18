
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { pathInsertNewUser, pathInstallTable } from "@/service/path"
import { CrossIcon, Loader, LucideCheckCircle } from "lucide-react"
import { useState } from "react"

const table = ['user', 'guru', 'kelas', 'sesi', 'ruang', 'cbt']
const option = {
    method : "post",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({})
}
export default function Install() {
  const [command, setCommand] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
  const handlerButton = async () => {
        setLoading(true)
        for(const i of table) {
            const t = await (await fetch(pathInstallTable(i), option )).json()
            setCommand((c) => [...c, t.status === 201 ? 'Berhasil' + " Menambahkan " + i : "Gagal" + " Menambahkan " + i])
        }
        
        await (await fetch(pathInsertNewUser, option)).json()
        setCommand((c) => [...c, "AKUN ADMIN ANDA user:admin pass:12345, Silahkan Pergi Ke halaman awal"])
  }
  return (
    <div className="h-screen content-center">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Instalasi Yami Test</CardTitle>
        <CardDescription>
          Klik tombol Install jika anda ingin melanjutkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled={loading} onClick={handlerButton} className="w-full">
            {
                loading ? (
                    <>
                        <Loader className="w-4 h-5 me-3 animate-spin"></Loader>
                        Proses Instalasi
                    </>
                ) : "INSTALL"
            }
          </Button>
        <div className="mt-4">
            {
                command.map((v,k) => (
                    <div key={k} className="flex mb-3">
                        {
                            v.startsWith("Berhasil") ? (
                                <LucideCheckCircle className="h-4 w-4 text-green-600 me-3"></LucideCheckCircle>
                            ) : (
                                <CrossIcon className="h-4 w-4 rotate-45 text-red-500 me-3"></CrossIcon>
                            )
                        }
                        <Badge className="mb-3" variant={v.startsWith("Berhasil") ? "default" : "destructive"}>{v}</Badge>
                    </div>
                ))
            }
        </div>
      </CardContent>
    </Card>

    </div>
  )
}
