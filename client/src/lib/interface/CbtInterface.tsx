export interface CbtInterface {
    id: number;
    name: string;
    jenis: string;
    durasi: string;
    min_durasi: string;
    mulai: null | string;
    berakhir: null | string;
    acak: boolean;
    code: string;
    priority: null | boolean;
    tokelas: string;
    creator: string | number;
    created_at: string;
    updated_at: string;
  }