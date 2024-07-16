// _app.tsx

import { AppProps } from 'next/app';
import './globals.css'; // Importeer de globale CSS-stijlen

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
