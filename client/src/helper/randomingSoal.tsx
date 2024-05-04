import { SoalInterface } from "@/lib/interface/SoalInterface";

export const randomingSoal = (soal: Array<SoalInterface>) : [SoalInterface[], (number|null)[][]] =>  {
    const sort = soal
      .sort(() => Math.random() - 0.5)
      .map((v) => {
        if(typeof v.answer === 'string') {
            v.answer = JSON.parse(v.answer);
        }
        if(typeof v.options === 'string') {
            v.options = JSON.parse(v.options);
        }
        return v;
      });
    const option = sort.map((v) => {
      const op = [v.id, null];
      if (v.tipe === "isian_panjang") {
        op.push(null);
      }
      return op;
    });
  
    return [sort, option];
  };