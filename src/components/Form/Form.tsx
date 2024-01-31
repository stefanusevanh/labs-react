import React from "react";
import styled, { css } from "styled-components";

interface FormType {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  formnovalidate?: boolean;
  gap?: string;
}

const ContainerForm = styled.form<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  ${(props) =>
    css`
      gap: ${props.$gap};
    `}
`;

const Form = ({ children, onSubmit, formnovalidate, gap }: FormType) => {
  return (
    <ContainerForm onSubmit={onSubmit} noValidate={formnovalidate} $gap={gap}>
      {children}
    </ContainerForm>
  );
};

export default Form;
