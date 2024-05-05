import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { pathAutorizeGuru, pathAutorizeUser } from "@/service/path"
import { Loader2, MessageSquareWarning } from "lucide-react"
import { FormEvent, Suspense, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface FormType {
    [key: string] : string;
}
export function ProccessForm(nisn:string, password:string, type:string = "user") {
    return new Promise<{ status:number, session?:string}>((resolve, reject) => {  
        const Obj =   {pass : password, [type === "user" ? "nisn" : "pegId"] : nisn }
        const path = type === "user" ? pathAutorizeUser : pathAutorizeGuru
        console.log(path)
        fetch(path,
            {
                method : "POST",
                headers : { 
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(Obj)
            }
        ).then(r=>r.json()).then(resolve).catch(reject);
    })
}
export default function AuthUser() {
    const [form, setForm] = useState<FormType>({
        nisn : "",
        password : ""
    })
    const [msg, setMsg] = useState<string|boolean>(false)
    const [loadingUser, setLoadingUser] = useState<boolean>(false)
    const [loadingAdmin, setLoadingAdmin] = useState<boolean>(false)
    const nav = useNavigate();

    const handleForm = (event: FormEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget
        const y:FormType = form;
        y[name] = value;
        setForm(y)
    }

    const handleSubmitUser = async () => {
        setLoadingUser(true);
        const res = await ProccessForm(form.nisn, form.password)
        if(res.status === 201 && res.session) {
            sessionStorage.setItem("refresh-token", res.session)
            nav("/guest/" + form.nisn, { replace :true})
        } else {
            setMsg(true)
        }
        setLoadingUser(false)
    }

    const handleSubmitAdmin = async () => {
        setMsg(false)
        setLoadingAdmin(true)
        console.log(form);
        const res = await ProccessForm(form.nisn, form.password, "admin")
        if(res.status === 201 && res.session) {
            sessionStorage.setItem("refresh-admin", res.session)
            nav("/dashboard", { replace :true})
        } else {
            setMsg(true)
        }
        setLoadingAdmin(false)
    }
    return(
        <Suspense fallback={"Tunggu Sebentar"}>
            {msg ?? (
                <Alert>
                    <MessageSquareWarning className="h-4 w-4"/>
                    <AlertTitle>ID atau Sandi Salah</AlertTitle>
                    <AlertDescription>Periksa Kembali data anda, pastikan semua benar</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-4 px-6">
                <div className="grid gap-2 text-start">
                <Label htmlFor="email">NISN/ID</Label>
                <Input
                    id="email"
                    name="nisn"
                    type="text"
                    placeholder="contoh : 00234234"
                    onInput={handleForm}
                    required
                />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">KODE LOGIN</Label>
                        <Link onClick={() => alert("Kode login Adalah Kode untuk masuk yang sudah tertera pada kartu peserta ujian AM-BK")}
                        to="#"
                        className="ml-auto inline-block text-sm underline"
                        >
                        Bingung Kode Login?
                        </Link>
                    </div>
                    <Input id="password" onInput={handleForm} name="password" type="password" required />
                </div>
                <Button onClick={handleSubmitUser} className="w-full" disabled={loadingUser || loadingAdmin}>
                    {loadingUser ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sedang Mencoba...
                        </>
                    ) : "Login"}
                </Button>
                <Button variant="outline" onClick={handleSubmitAdmin} className="w-full" disabled={loadingAdmin || loadingUser}>
                    {loadingAdmin ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sedang Mencoba...
                        </>
                    ) : "Login dengan Admin"}
                </Button>
            </div>
        </Suspense>
    )
}