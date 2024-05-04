export const JSONParse = (json: string) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return [];
    }
  };