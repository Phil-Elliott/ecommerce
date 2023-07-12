import { useEffect, useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GameProps } from "components/shared/Types/Types";
import Signin from "components/Signin/Signin";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Provider } from "react-redux";
import store from "../../redux/store";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState<GameProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches game data when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // add this line
        const response = await axios.get("http://localhost:3000/api/v1/games");
        const data = response.data;

        if (data.status === "success") {
          setGames(data.data.data);
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

1) Fix product page
  - make responsive
2) Add Reviews and put at bottom of product page
3) Fix up sign up components effects and add styles to forgot password
4) Add checkout and functionality
5) Add view user account and change some details
  - chang password
  - order history
  - review history - can change reviews



add some user personalization stuff
 - change password
 - order history


*/
