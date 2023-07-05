export const transformNumber = (number: number): string | number => {
  if (number <= 99999) {
    return number;
  } else if (number <= 99999999) {
    return `${Math.floor(number / 10000)}万`;
  } else {
    return `${(number / 100000000).toFixed(2)}亿`;
  }
};
