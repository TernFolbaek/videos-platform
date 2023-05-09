import '../styles/globals.css';
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
      <AnyComponent {...pageProps} />
  )
}

export default MyApp;
