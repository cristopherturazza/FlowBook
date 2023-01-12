import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Head>
        <title>FlowBook</title>
        <meta name="FlowBook" content="A social platform for book exchanges" />
        <link rel="icon" href="/book-icon.ico" />
      </Head>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  );
}
