import Link from "next/link";
import styled from "styled-components";
import VideoList from ".";
import { useTheme } from "../context/themeContext";
import ThemeToggleButton from './themeButton';

export default function Navbar() {
  const {theme} = useTheme()

  return (
    <nav className={theme}>
      <$NavbarContainer>
      <ThemeToggleButton/>

        <$LinkContainer>
          <Link href="/">
              <h1>Home</h1>
          </Link>
          <Link href="/sign-login">
              <h1>Profile</h1>
          </Link>
        </$LinkContainer>
      </$NavbarContainer>
    </nav>
  );
}

export const $NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 12px;
`;

export const $LinkContainer = styled.div`
  display:flex;
  justify-content: space-around;
  width 100%;
  font-size: 25px;
  color: black;
  text-decoration: none;

`;


