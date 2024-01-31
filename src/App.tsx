import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import GlobalStyle from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import { themes } from "./styles/theme";
import { Toaster } from "sonner";

function App() {
  const theme = useSelector((state: RootState) => state.currentTheme.theme);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ duration: 2500 }}
      />
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
