import '../styles/globals.css';
import { AppProps } from 'next/app';
import Navbar from './nav';
import { ThemeProvider } from '../context/themeContext';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <div className="body">
          <AnyComponent {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp;
