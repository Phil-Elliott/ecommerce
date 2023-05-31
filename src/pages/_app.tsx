import { useEffect, useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GameProps } from "components/shared/Types/Types";
import Signin from "components/Signin/Signin";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Provider, useDispatch } from "react-redux";
import store from "../../redux/store";
import { addToCart } from "redux/slices/cartSlice";
import { addToList } from "redux/slices/wishListSlice";

export default function App({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState<GameProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/games")
      .then((response) => response.json())
      .then((data) => {
        // If there is a status field and it's set to 'success', use the games data.
        if (data.status === "success") {
          setGames(data.data.games);
        } else {
          console.error("Error fetching games:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <SyncLocalStorageWithStore />
          <Component {...pageProps} games={games} />
        </Layout>
      </Dialog.Root>
    </Provider>
  );
}

function SyncLocalStorageWithStore() {
  const [isClient, setClient] = useState(false);
  const dispatch = useDispatch();

  // This useEffect will run once after the component mounts,
  // indicating that we're now on the client-side.
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const wishlistFromLocalStorage = JSON.parse(
        localStorage.getItem("wishList") || "[]"
      );

      console.log(cartFromLocalStorage);
      cartFromLocalStorage.forEach((item: GameProps) =>
        dispatch(addToCart(item))
      );
      wishlistFromLocalStorage.forEach((item: GameProps) =>
        dispatch(addToList(item))
      );
    }
  }, [dispatch, isClient]);

  return null;
}

/*

1) Get the game data from the server
2) Fix the login and signup forms to save cookie for grabbing other data
3) Plug in both wishList and cart to the server
4) Work on quantity
5) Start fixing up the styles


1) Handle logging in the user (need to save jwt or something)
2) Protect the wishlist and cart routes I think
3) Have them get called from redux if user is logged in


Work on quantity next

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
