import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Take a look at what we sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* <h1 className="text-4xl bg-red bg-Secondary">Hello</h1>
        <h2>fuck</h2> */}
      </div>
    </>
  );
}

/*

  Setup tailwind

  1) Make header
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
