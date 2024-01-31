import { useState } from "react";
import styled, { css } from "styled-components";

const DropdownMenuContainer = styled.div<{ $width?: string }>`
  position: relative;
  min-width: max-content;
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `};
`;

const DropdownMenuButton = styled.button<{ $changeStyleForModal?: boolean }>`
  width: 100%;
  text-align: left;
  border-radius: 0.625rem;
  background: white;
  border: 1px solid grey;
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #bdb5b6;
  }
  ${(props) =>
    props.$changeStyleForModal &&
    css`
      color: #a7a3ff;

      width: 100%;
      height: 3.875rem;
      border-radius: 0.5rem;
      background-color: #f0efff;
      padding: 1.25rem 1.625rem;
      border: none;
      text-align: left;
      letter-spacing: 1px;

      &:hover {
        color: white;
        background-color: #9c96ff;
      }
    `}
`;

const DropdownMenuList = styled.ul<{ $changeStyleForModal?: boolean }>`
  width: 100%;
  border-radius: 0.625rem;
  background: white;
  border: none;
  padding: 0;
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 1.85rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  ${(props) =>
    props.$changeStyleForModal &&
    css`
      width: 100%;
      background-color: #f0efff;
      text-align: left;
      letter-spacing: 1px;
      top: 3.25rem;
      font-size: 1rem;
      font-weight: 400;
    `}
`;

const DropdownMenuListItem = styled.li<{ $changeStyleForModal?: boolean }>`
  list-style: none;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #bdb5b6;

    &:first-child {
      border-radius: 0.625rem 0.625rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.625rem 0.625rem;
    }
  }
  ${(props) =>
    props.$changeStyleForModal &&
    css`
      color: #a7a3ff;
      padding: 0.65rem 1.625rem;
      &:hover {
        color: white;
        background-color: #9c96ff;
      }
    `}
`;

const DropdownMenu = ({
  currentValue,
  setCurrentValue,
  items,
  width,
  changeStyle,
}: {
  currentValue: string;
  setCurrentValue: (value: React.SetStateAction<string>) => void;
  items: string[];
  width: string;
  changeStyle?: boolean;
}) => {
  const [isShowMenuList, setIsShowMenuList] = useState(false);
  const showMenuList = () => setIsShowMenuList(true);
  const hideMenuList = () => setIsShowMenuList(false);

  const handleOnMouseClick = () => {
    if (isShowMenuList) {
      hideMenuList();
      return;
    }
    showMenuList();
    return;
  };
  const handleItemOnClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setCurrentValue(
      (e.target as HTMLElement).innerText as React.SetStateAction<string>
    );
    if (changeStyle) {
      handleOnMouseClick();
    }
  };

  return (
    <DropdownMenuContainer
      $width={width}
      // onMouseOver={showMenuList}
    >
      <DropdownMenuButton
        onClick={handleOnMouseClick}
        $changeStyleForModal={changeStyle}
      >
        {currentValue}
      </DropdownMenuButton>
      {isShowMenuList && (
        <DropdownMenuList
          onMouseLeave={hideMenuList}
          $changeStyleForModal={changeStyle}
        >
          {items.map((item, idx) => (
            <DropdownMenuListItem
              key={idx}
              onClick={handleItemOnClick}
              $changeStyleForModal={changeStyle}
            >
              {item}
            </DropdownMenuListItem>
          ))}
        </DropdownMenuList>
      )}
    </DropdownMenuContainer>
  );
};

export default DropdownMenu;
