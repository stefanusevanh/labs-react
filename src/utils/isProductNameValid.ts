export const minProductName = 10;

export const isProductNameValid = (ProductName: string) =>
  ProductName.length >= minProductName;
