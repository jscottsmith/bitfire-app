import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ColorsProvider } from "../context/colors";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorsProvider>
      <Component {...pageProps} />
    </ColorsProvider>
  );
}

export default MyApp;
