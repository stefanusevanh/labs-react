import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const NavLinkStyle = styled(NavLink)<{
  $isActive?: boolean;
}>`
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  &:link,
  :visited {
    color: inherit;
  }
  ${(props) =>
    props.$isActive &&
    css`
      color: ${props.theme.primary};
      &:link,
      :visited {
        color: ${props.theme.primary};
      }
    `}
`;

const NavLinkStyled = ({
  children,
  to,
  isActive,
}: {
  children: ReactNode;
  to: string;
  isActive?: boolean;
}) => {
  return (
    <NavLinkStyle to={to} $isActive={isActive}>
      {children}
    </NavLinkStyle>
  );
};

export default NavLinkStyled;
