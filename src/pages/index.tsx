import Link from "next/link";
import styled from "styled-components";
import VideoList from "./videoList";

export default function Navbar() {
  return (
    <div>
      <$NavbarContainer>
        <$LinkContainer>
          <Link href="/">
              <h1>Home</h1>
          </Link>
          <Link href="/sign-login">
              <h1>Profile</h1>
          </Link>
        </$LinkContainer>
      </$NavbarContainer>
      <VideoList/>

    </div>
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

`;


