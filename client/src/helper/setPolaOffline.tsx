export const setPolaOffline = (
    id: string,
    cbtid: string,
    pola: (number|null)[][]
  ): void => {
    localStorage.setItem(id + "|" + cbtid + "|pola", JSON.stringify(pola));
  };