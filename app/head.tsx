import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Your website description" />
      <meta property="og:title" content="Your website title" />
      <meta property="og:description" content="Your website description" />
      <meta property="og:image" content="/favicon.ico" />
      <meta property="og:url" content="https://www.yourwebsite.com" />
    </Head>
  );
}
