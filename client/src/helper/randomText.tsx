export const randomText = (i:number) =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, i);