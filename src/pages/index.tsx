import Deals from "components/Home/Deals/Deals";
import Hero from "components/Home/Hero/Hero";
import Items from "components/Home/Items/Items";
import Head from "next/head";

export default function Home() {
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
      <Items name="Featured Items" />
      <Items name="Best Sellers" />
      <Items name="New Arrivals" />
    </div>
  );
}

/*

  Electronics store



  Get a primary color
  Try fluid font sizes 
  Add to header
       - reminders
       - dark mode (need to also set up)
  Get links to work
  Start making some shared components
      - button
      - image with text over it



  Home Page
   - Have hero image
   - show all categories going down
   - Have Footer





  
  2) Make footer
  3) Make main page
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
