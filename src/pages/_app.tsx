import '../styles/globals.css';
import { AppProps } from 'next/app';
import Navbar from './nav';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
      <div>
        <Navbar />
        <div className="body">
          <AnyComponent {...pageProps} />
        </div>
      </div>
  )
}

export default MyApp;
