import Link from "next/link";
import useStore from "./useStore";
import styled from "styled-components";


export default function SL() {

  const {user} = useStore()

  if (user) {
    // User is logged in, show their information
    return (
      <$UserContainer>
          <Link href='/user-information'>Settings</Link>
          <Link href='/user-videos'>Your Videos</Link>
      </$UserContainer>
    );
  } else {
    // User is not logged in, show sign up and log in links
    return (
      <div>
        <Link href="/signUp">Sign Up</Link>
        <Link href="/login">Log In</Link>
      </div>
    );
  }
}

export const $UserContainer = styled.div`
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 30px;
`
