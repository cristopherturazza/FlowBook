import Head from "next/head";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Head>
      <title>FlowBook</title>
      <meta name="description" content="A social platform for book exchanges" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Home;
