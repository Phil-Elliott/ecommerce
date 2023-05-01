import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { TourProps } from "components/shared/Types/Types";

import HeroImg from "/assets/hero.jpg";

type ProductProps = {
  tours: TourProps[];
};

const product = ({ tours }: ProductProps) => {
  const [tour, setTour] = React.useState<TourProps | null>(null);

  // Get the 'id' property from the router.query object and parse it as an integer
  const router = useRouter();
  const queryId = router.query.id;
  const id = queryId ? parseInt(queryId as string) : null;

  // Find the tour with the given 'id' (if it exists)
  useEffect(() => {
    const currentTour = id ? tours.find((tour) => tour.id === id) : null;

    if (currentTour) {
      setTour(currentTour);
    }
  }, [id, tours]);

  useEffect(() => {
    console.log("tour", tour);
  }, [tour]);

  return (
    <div className="container mx-auto grid grid-cols-7 gap-20 py-32">
      <div className="flex gap-5 h-full h-[75vh] col-span-4">
        <div className="flex flex-col gap-2 h-full w-32">
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-full">
          <Image
            src={HeroImg}
            alt="tour picture"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-between py-2">
        <div>
          <h1 className="text-3xl mb-2">{tour?.name}</h1>
          <p className="text-lg text-gray-800">{tour?.category}</p>
          <p className="text-lg text-gray-800 mt-5">{tour?.rating}</p>
          <p className="text-lg text-gray-800 mt-5 border-gray border-b-2 pb-5">
            ${tour?.price}
          </p>
          <p className="text-lg text-gray-800 mt-5">{tour?.description}</p>
        </div>
        <div className="flex flex-col">
          <button className="bg-black text-white px-4 py-2 rounded mt-5">
            Add to Cart
          </button>
          <button className="px-4 py-2 rounded mt-5 border-black border-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default product;

/*


1) Left
  - Image
  Right
  - Name
  - Rating
  - Price
  - number of purchases
  - buttons (add to cart, save)

2) Description
  - Description
  - Itinerary
  - Includes
  - Excludes
  - Reviews

  3) Related Packages




*/
