import { BASE_URL } from "@/service/path";

export const uploadImage = (form: FormData) => {
    return new Promise<void>(() => {
      fetch(BASE_URL + "/cbt/soal/upload_foto", {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 201) {
            return {
              src: BASE_URL + res.src,
            };
          }
        });
    });
  };