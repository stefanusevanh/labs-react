export const minDimension = 1;
export const maxDimension = 99;

export const isDimensionValid = (value: number) =>
  value >= minDimension && value <= maxDimension;
