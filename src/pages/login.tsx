import { useState, FormEvent } from 'react';
import {useStore} from './useStore';
import { JwtPayload } from 'jsonwebtoken';
import  jwt  from 'jsonwebtoken';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const setUser = useStore((state) => state.setUser);
  const [token, setToken] = useState('');

  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        localStorage.setItem('token', token);

        // Decode the token to get the user information
        const decodedToken = jwt.decode(token) as JwtPayload;
        if (decodedToken) {
          setUser(decodedToken.username);
        }
        window.location.href = '/'
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
