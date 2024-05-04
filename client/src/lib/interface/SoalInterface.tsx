export interface SoalInterface {
    id: number;
    CBT_list_id: number;
    num: number | null;
    question: string;
    tipe: string;
    options: Array<string>|string;
    answer: Array<string>|string;
    score: number;
    created_at: string;
  }