export const minDiscount = 1;
export const maxDiscount = 100;

export const isDiscountValid = (discount: number) =>
  discount >= minDiscount && discount <= maxDiscount;
