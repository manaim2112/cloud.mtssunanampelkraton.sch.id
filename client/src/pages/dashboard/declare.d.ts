// myScript.d.ts
interface MammothResponse {
    value: string; // Tipe dari value (HTML)
    messages: string[]; // Tipe dari messages (Array of strings)
  }

declare const mammothPlus: {
    convertToHtml(options: { arrayBuffer: ArrayBuffer|string|null|undefined }): Promise<{ value : string, messages : string[] }>;
    done() : void;
};

declare const MathJax: any;
