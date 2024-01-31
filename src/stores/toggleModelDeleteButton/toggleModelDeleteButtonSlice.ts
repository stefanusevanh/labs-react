import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { isDeleteButtonClicked: boolean } = {
  isDeleteButtonClicked: false,
};

export const toggleModelDeleteButton = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    toggleDeleteButton: (state, actions: PayloadAction<boolean>) => {
      state.isDeleteButtonClicked = actions.payload;
    },
  },
});

export const { toggleDeleteButton } = toggleModelDeleteButton.actions;
export default toggleModelDeleteButton.reducer;
