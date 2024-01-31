import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isModelDetailsDataEqual } from "../../utils/isModelDetailsDataEqual";
import { IModel, IProductsDataResponse } from "../../types/api";

interface IAddProductField {
  name: string;
  price: number;
  discount: number;
  weight: number;
  length: number;
  width: number;
  category: string;
  total_model: number;
  model: IModel[];
  isUpdating: boolean;
  caseDetail: string;
  dial: string;
  hand: string;
  material: string;
  importantNote: string;
  movement: string;
}

const initialModelDetail: IModel = {
  name: "",
  photos: [],
  qty: 0,
};
const initialState: IAddProductField = {
  name: "",
  price: 0,
  discount: 0,
  weight: 0,
  length: 0,
  width: 0,
  category: "0",
  total_model: 1,
  model: [initialModelDetail],
  isUpdating: false,
  caseDetail: "",
  dial: "",
  hand: "",
  material: "",
  importantNote: "",
  movement: "",
};

export const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    storeAllData: (state, actions: PayloadAction<IProductsDataResponse>) => {
      const existingData = actions.payload;
      const totalModel = existingData.model.length;
      Object.assign(state, {
        ...existingData,
        total_model: totalModel,
        isUpdating: false,
      });
    },
    clearAllData: (state) => {
      Object.assign(state, {
        ...initialState,
      });
    },
    addProductFirst: (
      state,
      actions: PayloadAction<
        [string, number, number, number, number, number, string]
      >
    ) => {
      [
        state.name,
        state.price,
        state.discount,
        state.weight,
        state.length,
        state.width,
        state.category,
      ] = actions.payload;
    },
    addProductDetails: (
      state,
      actions: PayloadAction<Partial<IProductsDataResponse>>
    ) => {
      state.material = actions.payload.material as string;
      state.caseDetail = actions.payload.caseDetail as string;
      state.movement = actions.payload.movement as string;
      state.dial = actions.payload.dial as string;
      state.hand = actions.payload.hand as string;
      state.importantNote = actions.payload.importantNote as string;
    },
    addModel: (state) => {
      state.model.push(initialModelDetail);
      state.total_model++;
    },
    deleteModel: (state, actions: PayloadAction<number>) => {
      const id = actions.payload;
      if (state.model[id] === undefined) {
        return;
      }
      state.model.splice(id, 1);
      if (state.total_model > 1) {
        state.total_model--;
      }
    },
    updateModelDetails: (state, actions: PayloadAction<[number, IModel]>) => {
      const id = actions.payload[0];
      if (state.model[id] === undefined) {
        state.model[id] = actions.payload[1];
        return;
      }
      if (!isModelDetailsDataEqual(state.model[id], actions.payload[1])) {
        state.model[id] = actions.payload[1];
        return;
      }
    },
    setIsUpdating: (state, actions: PayloadAction<boolean>) => {
      state.isUpdating = actions.payload;
    },
  },
});

export const {
  storeAllData,
  clearAllData,
  addProductFirst,
  addProductDetails,
  addModel,
  deleteModel,
  updateModelDetails,
  setIsUpdating,
} = addProductSlice.actions;
export default addProductSlice.reducer;
