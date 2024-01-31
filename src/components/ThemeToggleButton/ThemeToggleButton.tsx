import styled from "styled-components";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../stores/toggleTheme/toggleThemeSlice";

const ButtonBorder = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #000;
  background: #fff;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;

  cursor: pointer;
`;

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  return (
    <ButtonBorder onClick={() => dispatch(changeTheme())}>
      <Icon src="/src/assets/img/theme-toggle.svg" />
    </ButtonBorder>
  );
};

export default ThemeToggleButton;
