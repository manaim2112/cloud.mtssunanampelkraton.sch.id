import { ResultInterface } from "@/lib/interface/ResultInterface";
import { UserInterface } from "@/lib/interface/UserInterface"
import { pathGetCBTListAll, pathGetUsersAll } from "@/service/path";
import { useEffect, useState } from "react"

export default function Analisis() {
    const [users, setUsers] = useState<UserInterface[]>();
    const [mapel, setMapel] = useState<ResultInterface[]>();

    useEffect(() => {
        fetch(pathGetUsersAll).then(r => r.json()).then(data => {
            if(data.status !== 200) return;
            setUsers(data.data)
        })
    }, [])


    useEffect(() => {
        fetch(pathGetCBTListAll).then(r=>r.json()).then(r => {
            if(r.status !== 200) return;    
            setMapel(r.data);

        })
    }, []);

    const RunningAnalisis = async () => {
        
    }
    return(

    )
}