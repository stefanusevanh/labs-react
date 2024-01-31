import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 3rem;
  background-color: #f7f6f4;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const NotFound = () => {
  const navigatePage = useNavigate();
  return (
    <MainContainer>
      <h1>404 Not Found</h1>
      <ButtonContainer>
        <Button
          buttonText="Back to Home"
          type="button"
          onClick={() => navigatePage("/")}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

export default NotFound;
