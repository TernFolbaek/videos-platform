import Link from "next/link";
import styled from "styled-components";
import VideoList from ".";
import { useTheme } from "../context/themeContext";
import ThemeToggleButton from './themeButton';
import videoImage from '../logos/video.png';  // Replace with your image path
import lightVideoImage from '../logos/lightvideo.png'
import pfp from '../logos/user.png'
import { useStore } from "../store/useStore";

import Image from "next/image";
import { useEffect, useState } from "react";
export default function Navbar() {
  const {theme} = useTheme()
  const logoImage = theme === "light" ? videoImage : lightVideoImage;
  const {user} = useStore()
  const [thisUser, setThisUser] = useState('')

  useEffect(()=>{
    setThisUser(user||'')
  },[user])

  
  return (
    <nav className={theme}>
      <$NavbarContainer>
        <$LogoContainer className="flex1">
          <$Image src={logoImage} alt="switch to dark mode"/>
        </$LogoContainer>
        <$LinkContainer>
          <$Link href="/">
              <h1>Home</h1>
          </$Link>
          <Link href="/sign-login">
              <h1>Profile</h1>
          </Link>
          <div className="buttons">
            <ThemeToggleButton/>
            <$SpecialLink className="no" href='sign-login'><Image width={50} src={pfp} alt="profile picture"/><$P>{thisUser}</$P></$SpecialLink>
          </div>
        </$LinkContainer>
      </$NavbarContainer>
    </nav>
  );
}

const $P = styled.p`
    font-size: 15px;
`
const $SpecialLink = styled(Link)`
    cursor: pointer;
    background: none;
    text-align: center;
`
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
  margin-bottom: 50px;
  box-shadow: 2px 2px lightgray;
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


