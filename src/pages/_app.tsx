import '../styles/globals.css';
import { AppProps } from 'next/app';
import Navbar from './nav';
import { ThemeProvider, useTheme } from '../context/themeContext';
import { ReactNode } from 'react';
import ThemeToggleButton from './themeButton';

interface ThemeClassComponentProps {
  children: ReactNode;
}

const ThemeClassComponent = ({ children }: ThemeClassComponentProps) => {
  const { theme } = useTheme();

  return <div className={theme}>{children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <ThemeProvider>
      <ThemeClassComponent>
        <Navbar />
        <div className="body">
          <AnyComponent {...pageProps} />
        </div>
      </ThemeClassComponent>
    </ThemeProvider>
  );
}

export default MyApp;
