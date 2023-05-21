import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import axios from "axios";

const UserInformation = () => {
  const [storedUser, setStoredUser] = useState("");
  const [storedUserId, setStoredUserId] = useState("");
  const { user, userId } = useStore();
  const setUserId = useStore((state) => state.setUserId);
  const setUser = useStore((state) => state.setUser);


  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await axios.post("http://localhost:2000/api/userId", { username: user });
          setUserId(response.data.userId);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    setStoredUser(user || ""); // Set default value as an empty string
    setStoredUserId(userId || ""); // Set default value as an empty string

    const localUser = localStorage.getItem("user") || "";
    const localUserId = localStorage.getItem("userId") || "";

    if (!user && localUser) {
      setStoredUser(localUser);
      setStoredUserId(localUserId);
    }
  }, [user, userId]);

  const logOut = async () => {
    try {
      setStoredUser("");
      setStoredUserId("");
      setUserId("")
      setUser("")
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="userInfo">
      <h1>User Info</h1>
      {storedUser ? (
        <>
          <p>username: {storedUser}</p>
          <p>user ID: {storedUserId}</p>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <>
          <p>Please log in</p>
          <p>
            <a href="/login">Log In</a>
          </p>
          <p>
            <a href="/signUp">Sign Up</a>
          </p>
        </>
      )}
    </div>
  );
};

export default UserInformation;
