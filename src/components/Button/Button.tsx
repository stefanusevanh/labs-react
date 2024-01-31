import styled, { css } from "styled-components";

interface ButtonType {
  buttonText: string;
  type: "button" | "reset" | "submit";
  onClick?: () => void;
  isDisabled?: boolean;
  noBoxShadow?: boolean;
  borderRadius?: string;
  height?: string;
}

const ButtonStyled = styled.button<{
  $isDisabled?: boolean;
  $noBoxShadow?: boolean;
  $borderRadius?: string;
  $height?: string;
}>`
  border-radius: 0.3125rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.primary};
  color: white;
  height: 3.6875rem;
  width: 100%;
  cursor: pointer;
  &:active {
    box-shadow: 0px 2px 40px 0px rgba(77, 71, 195, 0.4);
  }

  ${(props) =>
    props.$isDisabled &&
    css`
      background: #cac8ff;
      cursor: not-allowed;
      &:active {
        box-shadow: none;
      }
    `}

  ${(props) =>
    props.$borderRadius &&
    css`
      border-radius: ${props.$borderRadius};
    `}
  
  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `}
`;

const Button = ({
  buttonText,
  type,
  onClick,
  isDisabled,
  noBoxShadow,
  borderRadius,
  height,
}: ButtonType) => {
  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      $isDisabled={isDisabled}
      $noBoxShadow={noBoxShadow}
      $borderRadius={borderRadius}
      $height={height}
    >
      {buttonText}
    </ButtonStyled>
  );
};

export default Button;
