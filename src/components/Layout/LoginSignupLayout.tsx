import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

const LoginSignupLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 900px) {
    grid-template-columns: 0.5fr 1fr;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CoverImageContainer = styled.img`
  object-fit: cover;
  height: 100vh;
  width: 100%;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const PageRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem 2rem 2.5rem 0;
  height: 100%;
  align-self: center;
  @media screen and (max-width: 600px) {
    padding: 2.5rem 1rem 2.5rem 1rem;
  }
`;

const LogoContainer = styled.header`
  display: flex;
  justify-content: right;
`;

const FormContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const ThemeToggleButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const LoginSignupLayout = () => {
  return (
    <LoginSignupLayoutStyled>
      <CoverImageContainer
        src="/src/assets/img/signup-login-page-cover.png"
        height={"1024px"}
      />
      <PageRightContainer>
        <LogoContainer>
          <Icon src="/src/assets/img/matoa-logo.png" width="178px" />
        </LogoContainer>
        <FormContainer>
          <Outlet />
        </FormContainer>
        <ThemeToggleButtonContainer>
          <ThemeToggleButton />
        </ThemeToggleButtonContainer>
      </PageRightContainer>
    </LoginSignupLayoutStyled>
  );
};

export default LoginSignupLayout;
