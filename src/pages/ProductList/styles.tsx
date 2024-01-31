import styled from "styled-components";
import { css } from "styled-components";

export const ButtonContainer = styled.div<{ $width?: string }>`
  width: fit-content;
  display: flex;
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}
`;
export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.6875rem;
  gap: 1rem;
  justify-content: flex-end;
`;

export const ToolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.45rem;
`;

export const PaginationButton = styled.button<{ $isActive?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #f1f1f1;
  background: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  ${(props) =>
    props.$isActive &&
    css`
      background: ${props.theme.primary};
      border-color: ${props.theme.primary};
      color: white;
    `}
`;
export const PaginationButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: flex-end;
`;
