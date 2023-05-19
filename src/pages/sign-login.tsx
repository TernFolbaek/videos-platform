import Link from "next/link";
import { useStore } from "../store/useStore";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function SL() {
  const { user } = useStore();
  const [thisUser, setThisUser] = useState("");
  useEffect(() => {
    setThisUser(user || "");
  }, [user]);

  if (thisUser) {
    // User is logged in, show their information
    return (
      <$UserContainer>
        <Link href="/user-information">Settings</Link>
        <Link href="/user-videos">Your Videos</Link>
      </$UserContainer>
    );
  } else {
    // User is not logged in, show sign up and log in links
    return (
      <CenterContainer>
        <Link href="/signUp">Sign Up</Link>
        <Link href="/login">Log In</Link>
      </CenterContainer>
    );
  }
}

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 30px;
`;

export const $UserContainer = styled.div`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 30px;
`;
