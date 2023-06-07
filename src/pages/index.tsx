import { useState } from "react";
import Hero from "components/Home/Hero/Hero";
import Items from "components/Home/Items/Items";
import Head from "next/head";
import { GameProps } from "components/shared/Types/Types";
import Categories from "components/Home/Categories/Categories";

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
      <Items name="Best Sellers" games={games} />
      {/* <Items name="New Tours" games={games} /> */}
    </div>
  );
}

/*

  1) Make all of the links work
      - Shop Page
      - Checkout Page
      - Product Page
      
      
      - Sign in Page or maybe just a modal
      - Wishlist Page or also maybe a modal
      - Cart Page or also maybe a modal

      - Categories Page (Save this for later - might change)
      - Search Page (could be the same as shop page) 
        - same as all of the links on the home page. Can just use the filtered data from the shop page and still have all of the options on the left


  Electronics store
  
  4) Make other pages for the categories
  5) Make a product page
  6) Make a cart page or side thing
  7) Make a checkout page
  8) Make everything responsive


  1) Create a database
  2) Connect it to the app with the products
  3) Connect to strapi


  1) Need to use testing

*/
