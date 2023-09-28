import Hero from "components/Home/Hero/Hero";
import Items from "components/shared/Items/Items";
import Head from "next/head";
import Categories from "components/Home/Categories/Categories";
import TopBrands from "components/Home/TopBrands/TopBrands";

export default function Home() {
  return (
    <div className="mb-10 bg-Primary">
      <Head>
        <title>Home</title>
        <meta name="description" content="Take a look at what we sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Categories />
      <TopBrands />
      <Items name="Discover Something New" />
    </div>
  );
}
