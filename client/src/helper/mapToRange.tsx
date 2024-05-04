export function mapToRange(arr:number[], min:number, max:number) {
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);
  
    const mappedArray = arr.map((value) => {
      if (value < minValue) {
        return min;
      } else if (value > maxValue) {
        return value;
      } else {
        const percentage = (value - minValue) / (maxValue - minValue);
        return Math.ceil(min + percentage * (max - min));
      }
    });
  
    return mappedArray;
  }