import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>FlowBook</title>
        <meta
          name="description"
          content="A social platform for book exchanges"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
