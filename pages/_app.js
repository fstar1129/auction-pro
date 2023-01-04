import "../styles/globals.css";
import Head from "next/head";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pirates Of Arrland</title>
      </Head>
      <GoogleAnalytics
        measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
