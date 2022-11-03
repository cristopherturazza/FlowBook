import "../styles/globals.css";
import Layout from "../components/Layout";

import type { AppProps } from "next/app";

import { AuthContextProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </div>
  );
}
