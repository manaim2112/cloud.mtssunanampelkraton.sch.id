import { BASE_URL, pathCountUsers, pathGetUserWithId, pathGetUserWithKelas } from "./path"

export const count = () => {
    return new Promise((resolve, reject) => {
        fetch(pathCountUsers).then(r=>r.json()).then(resolve).catch(reject)   
    })
}

export const findById = (id:number) => {
    return new Promise((resolve, reject) => {
        fetch(pathGetUserWithId(id)).then(r=>r.json()).then(resolve).catch(reject)    
    })
}

export const findByClass = (c:string) => {
    return new Promise((resolve, reject) => {
        fetch(pathGetUserWithKelas(c)).then(r=>r.json()).then(resolve).catch(reject)
    })
} 

const pathGetUserWithSession = (c:string) => BASE_URL + "/user/session" + c
export const findBySessions = (s:string) => {
    return new Promise((resolve, reject) => {
        fetch(pathGetUserWithSession(s)).then(r=>r.json()).then(resolve).catch(reject)   
    })
}