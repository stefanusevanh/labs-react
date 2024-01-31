import styled, { css } from "styled-components";

export const LoadingText = styled.p<{ $isError?: boolean }>`
  visibility: hidden;
  color: black;
  width: fit-content;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  ${(props) =>
    props.$isError &&
    css`
      visibility: visible;
    `};
`;
