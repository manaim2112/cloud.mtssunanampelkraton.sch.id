import { Progress } from "@/components/ui/progress"
import { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Index() {
    const [progress, setProgress] = useState(0)
    const nav = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            const p = progress+10;
            if(progress < 100) {
                setProgress(p)
            } else {
                nav("/auth/user", { replace: true })
            }
        }, 1000*Math.random())
    }, [progress, nav])
    return(
        <Suspense fallback="Tunggu Sebentar">
            <div className="h-screen content-center justify-center text-center">
                <div className="text-8xl animate-pulse font-bold">
                    AM-BK 2024
                </div>
                <div className="text-lg font-sans">
                    MTs Sunan Ampel Kraton Pasuruan
                </div>
                <div className="w-3/4 mx-auto mt-8">
                    <Progress value={progress}/>
                </div>
            </div>
        </Suspense>
    )
}