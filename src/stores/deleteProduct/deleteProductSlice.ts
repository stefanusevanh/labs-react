import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { id: number | null; isModalOpen: boolean } = {
  id: null,
  isModalOpen: false,
};

export const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    deleteProduct: (state, actions: PayloadAction<number>) => {
      state.id = actions.payload;
    },
    openModal: (state) => {
      if (state.isModalOpen === false) {
        state.isModalOpen = true;
        return;
      }
    },
    closeModal: (state) => {
      if (state.isModalOpen === true) {
        state.isModalOpen = false;
        return;
      }
    },
    removeDeletedId: (state) => {
      state.id = null;
    },
  },
});

export const { deleteProduct, openModal, closeModal, removeDeletedId } =
  deleteProductSlice.actions;
export default deleteProductSlice.reducer;
