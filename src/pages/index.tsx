import { useState } from "react";
import Hero from "components/Home/Hero/Hero";
import Items from "components/Home/Items/Items";
import Head from "next/head";
import { GameProps } from "components/shared/Types/Types";
import Categories from "components/Home/Categories/Categories";
import TopBrands from "components/Home/TopBrands/TopBrands";

type HomeProps = {
  games: GameProps[];
};

export default function Home({ games }: HomeProps) {
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
      <Items name="Best Sellers" games={games} />
    </div>
  );
}
