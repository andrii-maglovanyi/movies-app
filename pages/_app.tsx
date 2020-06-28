import Head from "next/head";

import "../public/styles.css";

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <>
      <Head>
        <title>Movies App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
