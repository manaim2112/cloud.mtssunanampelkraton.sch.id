export interface SoalInterface {
    id: number;
    CBT_list_id: number;
    num: number | null;
    question: string;
    tipe: string;
    options: any;
    answer: any;
    score: number;
    created_at: string;
  }