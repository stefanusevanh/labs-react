import styled, { css } from "styled-components";
import Icon from "../Icon";
import React from "react";

interface FormInput {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  titleText?: string;
  errorText?: string;
  isError?: boolean;
  hideErrorBlock?: boolean;
  iconURL?: string;
  iconOnClick?: () => void;
  iconNotClicked?: () => void;
  additionalStyle?: React.CSSProperties;
  iconWidth?: string;
  iconHeight?: string;
  iconStyle?: React.CSSProperties;
  unitNumber?: string;
  acceptedFormat?: string;
  id?: string;
  minLength?: number;
  maxLength?: number;
}

const FormInputStyled = styled.input<{ $isError?: boolean }>`
  width: 100%;
  /* height: 3.875rem; */
  border-radius: 0.5rem;
  background-color: white;
  padding: 0.75rem 0.75rem 0.75rem 1.1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.primaryText};
  }
  &::placeholder {
    color: ${(props) => props.theme.secondaryText};
  }
  ${(props) =>
    props.type === "password" &&
    css`
      letter-spacing: 0.3rem;
      &::placeholder {
        letter-spacing: 0;
      }
    `}

  ${(props) =>
    props.$isError &&
    css`
      border: 1px solid ${props.theme.danger};
    `}
`;

const FormInputTextArea = styled.textarea<{ $isError?: boolean }>`
  background: #f1f1f1;
  padding: 1rem;
  height: 10rem;
  width: 100%;
  resize: none;
  border: none;
  border-radius: 0.5rem;
  ${(props) =>
    props.$isError &&
    css`
      border: 1px solid ${props.theme.danger};
    `}
`;

const FormInputErrorText = styled.p<{
  $isError?: boolean;
  $hideErrorBlock?: boolean;
}>`
  visibility: hidden;
  color: ${(props) => props.theme.danger};
  width: fit-content;
  font-size: 0.85rem;
  ${(props) =>
    props.$isError &&
    css`
      visibility: visible;
      animation: tilt-shaking 0.25s 2;
      @keyframes tilt-shaking {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(1.5deg);
        }
        50% {
          transform: rotate(0deg);
        }
        75% {
          transform: rotate(-1.5deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    `};
  ${(props) =>
    !props.$isError &&
    props.$hideErrorBlock &&
    css`
      display: none;
    `}
`;

const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  titleText,
  errorText,
  isError,
  hideErrorBlock,
  iconURL,
  iconOnClick,
  iconNotClicked,
  additionalStyle,
  iconWidth,
  iconHeight,
  iconStyle,
  unitNumber,
  acceptedFormat,
  id,
  minLength,
  maxLength,
}: FormInput) => {
  const formInput =
    type === "textarea" ? (
      <FormInputTextArea
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></FormInputTextArea>
    ) : (
      <FormInputStyled
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={additionalStyle}
        $isError={isError}
        accept={acceptedFormat}
        multiple={true}
        id={id}
      />
    );

  return (
    <>
      <div style={{ position: "relative" }}>
        {titleText}
        {formInput}
        {
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormInputErrorText
              $isError={isError}
              $hideErrorBlock={hideErrorBlock}
            >
              {errorText}
            </FormInputErrorText>
            {iconURL && (
              <Icon
                src={iconURL}
                style={
                  iconStyle
                    ? iconStyle
                    : {
                        position: "absolute",
                        right: "1.5rem",
                        bottom: "2.4rem",
                      }
                }
                width={iconWidth}
                height={iconHeight}
                $filter="brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(227deg) brightness(97%) contrast(88%)"
                onMouseDown={iconOnClick}
                onMouseUp={iconNotClicked}
              />
            )}
            {unitNumber && (
              <span
                style={{
                  position: "absolute",
                  right: "1.5rem",
                  bottom: "2.7rem",
                }}
              >
                {unitNumber}
              </span>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default FormInput;
