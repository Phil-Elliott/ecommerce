import { useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GameProps } from "components/shared/Types/Types";
import Signin from "components/Signin/Signin";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  const [games, setGames] = useState<GameProps[]>([
    {
      id: 1,
      name: "Battle of the Century",
      image: "battle-of-the-century.jpg",
      price: 160,
      description: "Engage in epic battles with diverse characters.",
      category: "Fighting",
      publisher: "Capcom",
      releaseDate: "2023-05-15",
      rating: 4.5,
      playerCount: 2,
      platform: "PC",
      gameModes: ["Singleplayer", "Multiplayer"],
    },
    {
      id: 2,
      name: "Mystical Quest",
      image: "mystical-quest.jpg",
      price: 70,
      description: "Embark on a mystical quest full of puzzles and danger.",
      category: "Adventure",
      publisher: "Ubisoft",
      releaseDate: "2023-06-01",
      rating: 4.7,
      playerCount: 1,
      platform: "PlayStation",
      gameModes: ["Singleplayer"],
    },
    {
      id: 3,
      name: "Racing Frenzy",
      image: "racing-frenzy.jpg",
      price: 65,
      description:
        "Experience adrenaline-pumping racing action on diverse tracks.",
      category: "Racing",
      publisher: "EA",
      releaseDate: "2023-07-20",
      rating: 4.8,
      playerCount: 12,
      platform: "Xbox",
      gameModes: ["Singleplayer", "Multiplayer"],
    },
    {
      id: 4,
      name: "Cyber City",
      image: "cyber-city.jpg",
      price: 75,
      description: "Navigate through a dystopian cyberpunk city of the future.",
      category: "RPG",
      publisher: "CD Projekt Red",
      releaseDate: "2023-08-01",
      rating: 5,
      playerCount: 1,
      platform: "PC",
      gameModes: ["Singleplayer"],
    },
    {
      id: 5,
      name: "Fantasy Soccer",
      image: "fantasy-soccer.jpg",
      price: 60,
      description: "Take control of your favorite fantasy soccer team.",
      category: "Sports",
      publisher: "Konami",
      releaseDate: "2023-09-15",
      rating: 4.6,
      playerCount: 2,
      platform: "PlayStation",
      gameModes: ["Singleplayer", "Multiplayer"],
    },
    // Add more games as required...
  ]);
  const [open, setOpen] = useState<boolean>(false);

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
          <Component {...pageProps} games={games} />
        </Layout>
      </Dialog.Root>
    </Provider>
  );
}

/*

Work on functionality and architecture now

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
