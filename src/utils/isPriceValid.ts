export const minPrice = 100;
export const maxPrice = 999999999;

export const isPriceValid = (price: number) =>
  price >= minPrice && price <= maxPrice;
