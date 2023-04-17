import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

/*

add testing
start making home page (use figma and mrbeast for design)
learn node
go to gym lazy ass
call the immigration office


stack
- next
- redux
- jest
- tailwind
- graphql
- postgres or mongo
- node & express

*/
