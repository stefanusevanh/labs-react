import { ReactNode } from "react";
import styled, { css } from "styled-components";

const ModalBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: #000000be;
  display: none;
  ${(props) =>
    props.$isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const ModalCard = styled.div`
  background-color: white;
  color: black;
  width: 37.6875rem;
  height: 12.4375rem;
  padding: 0 2.5rem;
  border-radius: 0.9375rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalBackground $isOpen={isOpen} onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>{children}</ModalCard>
    </ModalBackground>
  );
};

export default Modal;
