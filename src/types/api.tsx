export interface IUserDataResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  token: string;
}

export interface IProductsDataResponse {
  id: number;
  name: string;
  price: number;
  weight: number;
  width: number;
  length: number;
  category: "1" | "2" | "3";
  discount: number;
  caseDetail: string;
  dial: string;
  hand: string;
  material: string;
  importantNote: string;
  movement: string;
  model: IModel[];
}

export interface IModel {
  name: string;
  qty: number;
  photos: string[];
}

//Cloudinary API
export interface ICloudinaryResponse {
  url: string;
  asset_id: string;
}
