export const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(","),
      mm = arr[0].match(/:(.*?);/);
    if(!mm) return;
  
    const mime = mm[1],
      bstr = atob(arr.length > 0 ? arr[1] : "");
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };