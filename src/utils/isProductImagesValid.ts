export const minImage = 1;
export const maxImage = 5;

export const isProductImagesValid = (images: string[]) =>
  images.length >= minImage && images.length <= maxImage;
