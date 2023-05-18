import Link from "next/link";
import styled from "styled-components";
import VideoList from ".";
import { useTheme } from "../context/themeContext";
import ThemeToggleButton from './themeButton';
import videoImage from '../logos/video.png';  // Replace with your image path

import Image from "next/image";
export default function Navbar() {
  const {theme} = useTheme()

  return (
    <nav className={theme}>
      <$NavbarContainer>
        <$LogoContainer className="flex1">
          <$Image src={videoImage} alt="switch to dark mode"/>
        </$LogoContainer>
        <$LinkContainer>
          <$Link href="/">
              <h1>Home</h1>
          </$Link>
          <Link href="/sign-login">
              <h1>Profile</h1>
          </Link>
          <ThemeToggleButton/>
        </$LinkContainer>
      </$NavbarContainer>
    </nav>
  );
}

const $LogoContainer = styled.div `
    flex: 0.4;
    text-align: center;
`
const $Link = styled(Link) `
    color: black;
`

const $Image = styled(Image) `
    width: 70px;
    height: auto;
    border: none;

`
export const $NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 12px;
  flex: 50;
  align-items: center;
`;

export const $LinkContainer = styled.div`
  display:flex;
  justify-content: space-around;
  width 100%;
  font-size: 25px;
  color: black;
  text-decoration: none;
  flex: 1;

`;


