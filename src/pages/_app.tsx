import { useEffect, useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GameProps } from "components/shared/Types/Types";
import Signin from "components/Signin/Signin";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch } from "../../redux/store";
import { addToCart } from "redux/slices/cartSlice";
import { addToList } from "redux/slices/wishListSlice";
import axios from "axios";
import Spinner from "components/shared/Spinner/Spinner";

export default function App({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState<GameProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // add this line
        const response = await axios.get("http://localhost:3000/api/v1/games");
        const data = response.data;

        if (data.status === "success") {
          setGames(data.data.games);
        } else {
          console.error("Error fetching games:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Layout signInButton={() => setOpen(true)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-50 flex items-center justify-center" />
            <Dialog.Content className="fixed left-0 right-0 top-32  mx-auto w-96 bg-white rounded-md p-4 z-50 transition-transform duration-300 ease-out dialog-content">
              <Signin closeModal={() => setOpen(false)} />
              <Dialog.Close asChild>
                <button
                  className="absolute top-0 right-0 p-3"
                  aria-label="Close"
                >
                  <Cross1Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
          {isLoading ? null : <Component {...pageProps} games={games} />}
        </Layout>
      </Dialog.Root>
    </Provider>
  );
}

/*

Tob Brands section on home page
1) Make it responsive
2) Get the correct assets
3) Add the correct links




5) Work on Home page styles
7) Work on providing other options
     - log out
     - my account
     - my orders
     - change password
     - forgot password





1) add and get products to display in shop ( alot to do here )
2) Finish configuring signup and signin
3) Create cart page
    - Add to cart functionality
    - Remove from cart functionality
    - Update cart functionality
    - Checkout functionality
4) Create wishlist page
    - Add to wishlist functionality
    - Remove from wishlist functionality
    - Update wishlist functionality
5) Create checkout page
    - Add payment functionality
    - Add shipping functionality
    - Add order functionality


*/
