import { SoalInterface } from "@/lib/interface/SoalInterface";

export const transformToPola = (soal: SoalInterface[], pola: (number|null)[][]): SoalInterface[] => {
    const result: SoalInterface[] = [];
  
    pola.forEach(([id]) => {
      const soalItem = soal.find((item) => item.id === id);
      if (soalItem) {
        result.push({ ...soalItem});
      }
    });
  
    return result;
  };