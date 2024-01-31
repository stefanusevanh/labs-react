import styled, { css } from "styled-components";

const Icon = styled.img<{
  width?: string;
  height?: string;
  $filter?: string;
  $isClickDisabled?: boolean;
}>`
  cursor: pointer;

  ${(props) => css`
    width: ${props.width};
    height: ${props.height};
    filter: ${props.$filter};
  `}
  ${(props) =>
    props.$isClickDisabled &&
    css`
      cursor: not-allowed;
    `}
`;

export default Icon;
