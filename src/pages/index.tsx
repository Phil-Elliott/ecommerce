import { useState } from "react";
import Deals from "components/Home/Deals/Deals";
import Hero from "components/Home/Hero/Hero";
import Items from "components/Home/Items/Items";
import Head from "next/head";
import { TourProps } from "components/shared/Types/Types";

type HomeProps = {
  tours: TourProps[];
};

export default function Home({ tours }: HomeProps) {
  return (
    <div className="mb-10">
      <Head>
        <title>Home</title>
        <meta name="description" content="Take a look at what we sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Deals />
      <Items name="Best Sellers" tours={tours} />
      <Items name="New Tours" tours={tours} />
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
