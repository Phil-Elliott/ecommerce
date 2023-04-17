import Head from "next/head";
import Image from "next/image";
import Hero from "/assets/hero.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Take a look at what we sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative container mx-auto h-screen flex justify-center">
        <Image
          src={Hero}
          alt="Hero"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute top-52 flex flex-col justify-center items-center pt-10">
          <h1 className="text-white font-bold text-8xl">Great Products</h1>
          <p className="text-white font-semibold text-xl my-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
          <button className="bg-white text-black font-bold py-2 px-12 text-xl rounded hover:bg-gray-200 transition duration-200 ease-in-out">
            Shop
          </button>
        </div>
      </div>
    </>
  );
}

/*

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
