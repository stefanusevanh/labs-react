const lightTheme = {
  primary: "#D84727",
  secondary: "#F1DDC9",
  primaryText: "#333333",
  secondaryText: "#666666",
  danger: "#FF4949",
  background: "#FFFFFF",
};

const darkTheme: Theme = {
  primary: "#D84727",
  secondary: "#F1DDC9",
  primaryText: "#FFFFFF",
  secondaryText: "#666666",
  danger: "#FF4949",
  background: "#3D3D3D",
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
