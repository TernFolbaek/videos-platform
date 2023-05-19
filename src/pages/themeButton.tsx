import { useTheme } from '../context/themeContext';
import sunImage from '../logos/sun.png';  // Replace with your image path
import moonImage from '../logos/moon.png';  // Replace with your image path
import Image from 'next/image';
import styled from "styled-components";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {theme === 'light' ? 
        <$Image src={moonImage} alt="Switch to Dark Mode" /> : 
        <$Image src={sunImage} alt="Switch to Light Mode" />
      }
    </button>
  );
}

const $Image = styled(Image) `
    width: 35px;
    height: auto;
    border: none;

`

