import { SoalInterface } from "@/lib/interface/SoalInterface";

export const setSoalOffline = (
    id: string,
    cbtid: string,
    soal: SoalInterface[] |null,
    pola: (number  | null)[][]
  ): void => {
    localStorage.setItem(id + "|" + cbtid + "|soal", JSON.stringify(soal));
    localStorage.setItem(id + "|" + cbtid + "|pola", JSON.stringify(pola));
    return;
  };