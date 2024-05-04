import { SoalInterface } from "@/lib/interface/SoalInterface";

export const getSoalOffline = (id: string, cbtid: string) : [SoalInterface[]|null, (number|null)[][]|null] => {
    const s = localStorage.getItem(id + "|" + cbtid + "|soal");
    const p = localStorage.getItem(id + "|" + cbtid + "|pola");
    if (s && p) {
      return [JSON.parse(s), JSON.parse(p)];
    }
    return [null, null];
  };