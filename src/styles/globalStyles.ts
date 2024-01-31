import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.primaryText};
    font-family: "Taviraj", serif;
    font-size: 1rem;
  }


  #root {
    width: 100%;
    height: 100vh;
  }
`;

export default GlobalStyle;
