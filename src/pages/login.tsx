import styled from 'styled-components';
import { useState, FormEvent, useEffect } from 'react';
import {useStore} from '../store/useStore';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Styled components
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const setUser = useStore((state) => state.setUser);
  const setUserId = useStore((state) => state.setUserId);
  const [token, setToken] = useState('');
  const {user} = useStore()

  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:2000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        localStorage.setItem('token', token);

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
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledButton type="submit">Log In</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}
