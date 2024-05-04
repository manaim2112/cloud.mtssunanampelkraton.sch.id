export const dateParse = (t: string | Date): number => {
    if (typeof t === 'string') {
      const d = new Date(t);
      return Date.parse(d.toDateString());
    }
  
    return Date.now();
  };