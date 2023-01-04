import Main from "../components/Main";
import Footer from "../components/Footer";
import React from "react";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { HoneybadgerErrorBoundary } from "@honeybadger-io/react";
import honeybadger from "../helpers/honeybadger";
import { NextPageContext } from "next";

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID || "";
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || "";

export async function getServerSideProps(ctx: NextPageContext) {
  const lastBuildSHA = ctx.res?.getHeader("web-build");
  return {
    props: {
      lastBuildSHA,
    },
  };
}

export interface IProfile {
  lastBuildSHA: string;
}

const profile: React.FC<IProfile> = ({ lastBuildSHA }): JSX.Element => {
  return (
    <main
      className="min-h-full"
      style={{
        backgroundImage:
          'url("https://arrland.app/wp-content/uploads/2021/10/waves2.jpg")',
        backgroundPosition: "top center",
        backgroundRepeat: "repeat-y",
        minHeight: "100vh",
        maxWidth: "2000px",
        margin: "0 auto",
      }}
    >
      <HoneybadgerErrorBoundary honeybadger={honeybadger}>
        <Provider store={store}>
          <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
            <Main lastBuildSHA={lastBuildSHA} />
            <Footer />
          </MoralisProvider>
        </Provider>
      </HoneybadgerErrorBoundary>
    </main>
  );
};

export default profile;
