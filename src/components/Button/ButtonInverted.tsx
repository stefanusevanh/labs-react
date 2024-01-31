import styled, { css } from "styled-components";

export const ButtonInverted = styled.button<{ $borderRadius?: string }>`
  width: 100%;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  background-color: inherit;
  padding: 0.75rem;
  font-size: 1.5rem;
  ${(props) =>
    props.$borderRadius &&
    css`
      border-radius: ${props.$borderRadius};
    `}
  &:active {
    box-shadow: 0px 2px 40px 0px rgba(77, 71, 195, 0.4);
  }
`;
