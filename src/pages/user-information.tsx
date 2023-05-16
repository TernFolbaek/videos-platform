import { useStore } from "./useStore";
import axios from "axios";
import { useEffect, useState } from "react";

const UserInformation = () => {
  const { user, userId } = useStore();
  const setUser = useStore((state) => state.setUser);
  const setUserId = useStore((state) => state.setUserId);

  const [storedUser, setStoredUser] = useState('');
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    const localUser = localStorage.getItem('user') || '';
    const localUserId = localStorage.getItem('userId') || '';

    if (localUser) {
      setUser(localUser);
      setStoredUser(localUser);
    }

    if (localUserId) {
      setUserId(localUserId);
      setStoredUserId(localUserId);
    }

    if (!localUserId && localUser) {
      (async () => {
        try {
          const response = await axios.post('/api/userId', { username: localUser });
          const userIdFromResponse = response.data.userId;
          if (userIdFromResponse) {
            setUserId(userIdFromResponse);
            setStoredUserId(userIdFromResponse);
            localStorage.setItem('userId', userIdFromResponse);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, []);

  const logOut = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      });
      if (response.ok) {
        setUser('');
        setUserId('');
        setStoredUser('');
        setStoredUserId('');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        window.location.href = '/'
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className="userInfo">
      <h1>User Info</h1>
      <p>username: {storedUser}</p>
      <p>user ID: {storedUserId}</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default UserInformation;
