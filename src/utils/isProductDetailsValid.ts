export const minProductDetailsLength = 5;
export const maxProductDetailsLength = 500;

export const isProductDetailsValid = (productDetails: string) =>
  productDetails.length >= minProductDetailsLength &&
  productDetails.length <= maxProductDetailsLength;
