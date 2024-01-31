import styled from "styled-components";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import NavLinkStyled from "../../styles/NavLinkStyled";
import { ButtonInverted } from "../Button/ButtonInverted";
import { NavLink, useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookies";

const ContainerSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  width: 16.625rem;
  height: 100vh;
  padding: 1.8125rem 1.25rem 2.185rem 1.25rem;
  background: ${(props) => props.theme.secondary};
  color: #333333;
  filter: drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.25));

  @media screen and (max-width: 600px) {
    position: fixed;
  }
`;
const SidebarTitle = styled(NavLink)`
  font-size: 2rem;
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.primary};
  width: fit-content;
  margin: 0 auto;
  color: inherit;
  &:visited,
  &:link {
    text-decoration: none;
  }
`;

const ContainerNavbarItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
  text-align: center;
  height: 100%;
  margin: 6rem 0;
`;
const ContainerBottomItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Sidebar = () => {
  const navigatePage = useNavigate();

  const handleLogout = () => {
    removeCookie("token");
    navigatePage("/auth/login");
  };
  return (
    <ContainerSidebar>
      <SidebarTitle to={"/"}>Matoa Admin</SidebarTitle>
      <ContainerNavbarItems>
        <NavLinkStyled to="/product" isActive={true}>
          PRODUCT
        </NavLinkStyled>
        <a>REVENUE</a>
        <a>CATEGORIES</a>
      </ContainerNavbarItems>
      <ContainerBottomItems>
        <ThemeToggleButton />
        <ButtonInverted onClick={() => handleLogout()}>LOGOUT</ButtonInverted>
      </ContainerBottomItems>
    </ContainerSidebar>
  );
};

export default Sidebar;
