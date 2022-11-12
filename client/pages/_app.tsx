import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";

import type { AppProps } from "next/app";

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
