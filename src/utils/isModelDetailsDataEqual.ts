import { IModelSlice } from "../stores/addProduct/addProductSlice";

export const isModelDetailsDataEqual = (
  oldData: IModelSlice,
  newData: IModelSlice
) => {
  return Object.keys(oldData).every((key) => {
    if (key === "photos") {
      return oldData.photos.every((oldPicture, idx) => {
        oldPicture === newData.photos[idx];
      });
    } else {
      return (
        oldData[key as keyof IModelSlice] === newData[key as keyof IModelSlice]
      );
    }
  });
};
