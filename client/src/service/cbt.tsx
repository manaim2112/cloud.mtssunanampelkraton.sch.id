import { pathCBTListAll, pathCountCBTList, pathCreateManySoal, pathGetCBTListWithId } from "./path"

const count = () => {
    return new Promise((resolve, reject) => {
        fetch(pathCountCBTList).then(r=>r.json()).then(resolve).catch(reject)
    })
}

const findById = (id:number) => {
    return new Promise((resolve, reject) => {
        fetch(pathGetCBTListWithId(id)).then(r => r.json()).then(resolve).catch(reject)
    })
}

const all = () => {
    return new Promise((resolve, reject) => {
        fetch(pathCBTListAll).then(r=>r.json()).then(resolve).catch(reject)  
    })
}

// const htmlspecialchars = (str:string) => {
//     const map = {
//       '&': '&amp;',
//       '<': '&lt;',
//       '>': '&gt;',
//       '"': '&quot;',
//       "'": '&#039;',
//     };
  
//     return str.replace(/[&<>"']/g, function(m) { return map[m]; });
// }
export const removeScriptag = (q:string) => q.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  

interface OAIData {
    CBT_list_id : number;
    question : string;
    tipe : string;
    options : string;
    answer : string;
    score : string
}
export interface HTML {
    id: number;
    soal: string;
    tipe: string;
    jawaban: string[];
    kunci: (string|number)[];
    skor: number;
  }

export function save(data:Array<HTML>, id:string) {
    
    const oi:Array<OAIData> = [];
    data.forEach(e => {
        if(["Pilgan", "pilgan", "isian_singkat", "isian_panjang", "menjodohkan"].includes(e.tipe) || Number(e.skor)) {
            oi.push({
                CBT_list_id : Number(id),
                question : removeScriptag(e.soal),
                tipe : e.tipe,
                options : JSON.stringify(e.jawaban),
                answer : JSON.stringify(e.kunci),
                score : String(e.skor)
            })
        }
    });
    return new Promise((resolve)=> {
        try {
            fetch(pathCreateManySoal, {
                method : "POST",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(oi)
            }).then(r=>r.json()).then(r => {
                console.log(r)
                resolve(r.status === 201)
            }).catch(err => {
                resolve(err)
            })
        } catch (error) {
            resolve(false)
        }
    })
}

export default {
    all, findById, count
}