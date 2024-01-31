import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: "light",
};

export const toggleThemeSlice = createSlice({
  name: "toggleTheme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
        return;
      }
      state.theme = "light";
    },
  },
});

export const { changeTheme } = toggleThemeSlice.actions;
export default toggleThemeSlice.reducer;
