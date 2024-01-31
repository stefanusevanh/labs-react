import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const ContainerMainLayout = styled.div<{ $theme?: string }>`
  display: grid;
  grid-template-columns: auto 1fr;
  ${(props) => {
    switch (props.$theme) {
      case "light":
        return css`
          background: #f7f6f4;
        `;
      case "dark":
        return css`
          background: ${props.theme.background};
        `;
    }
  }};
`;

const ContainerRightPage = styled.div`
  padding: 0rem 5rem;
  height: 90vh;
  margin: auto 0;
  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const MainLayout = () => {
  const theme = useSelector((state: RootState) => state.currentTheme.theme);
  return (
    <ContainerMainLayout $theme={theme}>
      <Sidebar />
      <ContainerRightPage>
        <Outlet />
      </ContainerRightPage>
    </ContainerMainLayout>
  );
};

export default MainLayout;
