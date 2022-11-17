import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Head>
        <title>FlowBook</title>
        <meta
          name="description"
          content="A social platform for book exchanges"
        />
        <link rel="icon" href="/book-icon.ico" />
      </Head>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </div>
  );
}
