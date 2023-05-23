import { useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { TourProps } from "components/shared/Types/Types";
import Modal from "components/shared/Modal/Modal";
import Signin from "components/Signin/Signin";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function App({ Component, pageProps }: AppProps) {
  const [tours, setTours] = useState<TourProps[]>([
    {
      id: 1,
      name: "Tropical Paradise",
      image: "tropical-paradise.jpg",
      price: 1200,
      description:
        "Explore the beautiful tropical islands and sandy beaches. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      category: "Beach",
      location: "Maldives",
      duration: "7 days",
      date: "2023-05-15",
      rating: 4.5,
      availability: 15,
      groupSize: 20,
      difficulty: "Easy",
      activities: ["Snorkeling", "Swimming", "Sunbathing"],
    },
    {
      id: 2,
      name: "European Capitals Tour",
      image: "european-capitals.jpg",
      price: 2500,
      description:
        "Discover the charm and history of Europe's most iconic cities.",
      category: "Cultural",
      // category: "Beach",
      location: "Europe",
      duration: "14 days",
      date: "2023-06-01",
      rating: 4.7,
      availability: 20,
      groupSize: 25,
      difficulty: "Moderate",
      activities: ["Sightseeing", "Museum visits", "Food tasting"],
    },
    {
      id: 3,
      name: "Amazon Rainforest Adventure",
      image: "amazon-rainforest.jpg",
      price: 1800,
      description:
        "Immerse yourself in the biodiversity of the Amazon Rainforest.",
      category: "Nature",
      location: "Brazil",
      duration: "10 days",
      date: "2023-07-20",
      rating: 4.8,
      availability: 10,
      groupSize: 15,
      difficulty: "Moderate",
      activities: ["Hiking", "Wildlife watching", "Boat rides"],
    },
    {
      id: 4,
      name: "Himalayan Trek",
      image: "himalayan-trek.jpg",
      price: 2000,
      description:
        "Embark on an exhilarating journey through the majestic Himalayas.",
      category: "Adventure",
      location: "Nepal",
      duration: "14 days",
      date: "2023-08-01",
      rating: 5,
      availability: 8,
      groupSize: 12,
      difficulty: "Hard",
      activities: ["Trekking", "Camping", "Photography"],
    },
    {
      id: 5,
      name: "Tropical Paradise",
      image: "tropical-paradise.jpg",
      price: 1200,
      description: "Explore the beautiful tropical islands and sandy beaches.",
      category: "Beach",
      location: "Maldives",
      duration: "7 days",
      date: "2023-05-15",
      rating: 4.5,
      availability: 15,
      groupSize: 20,
      difficulty: "Easy",
      activities: ["Snorkeling", "Swimming", "Sunbathing"],
    },
    {
      id: 6,
      name: "European Capitals Tour",
      image: "european-capitals.jpg",
      price: 2500,
      description:
        "Discover the charm and history of Europe's most iconic cities.",
      category: "Cultural",
      // category: "Beach",
      location: "Europe",
      duration: "14 days",
      date: "2023-06-01",
      rating: 4.7,
      availability: 20,
      groupSize: 25,
      difficulty: "Moderate",
      activities: ["Sightseeing", "Museum visits", "Food tasting"],
    },
    {
      id: 7,
      name: "Amazon Rainforest Adventure",
      image: "amazon-rainforest.jpg",
      price: 1800,
      description:
        "Immerse yourself in the biodiversity of the Amazon Rainforest.",
      category: "Nature",
      location: "Brazil",
      duration: "10 days",
      date: "2023-07-20",
      rating: 4.8,
      availability: 10,
      groupSize: 15,
      difficulty: "Moderate",
      activities: ["Hiking", "Wildlife watching", "Boat rides"],
    },
    {
      id: 8,
      name: "Himalayan Trek",
      image: "himalayan-trek.jpg",
      price: 2000,
      description:
        "Embark on an exhilarating journey through the majestic Himalayas.",
      category: "Adventure",
      location: "Nepal",
      duration: "14 days",
      date: "2023-08-01",
      rating: 5,
      availability: 8,
      groupSize: 12,
      difficulty: "Hard",
      activities: ["Trekking", "Camping", "Photography"],
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
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
          <Component {...pageProps} tours={tours} />
        </Layout>
      </Dialog.Root>
    </>
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
