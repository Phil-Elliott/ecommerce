import { TourProps } from "components/shared/Types/Types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type ProductProps = {
  tours: TourProps[];
};

const product = ({ tours }: ProductProps) => {
  // Get the 'id' property from the router.query object and parse it as an integer
  const router = useRouter();
  const queryId = router.query.id;
  const id = queryId ? parseInt(queryId as string) : null;

  // Find the tour with the given 'id' (if it exists)
  const tour = id ? tours.find((tour) => tour.id === id) : null;

  useEffect(() => {
    console.log("tour", tour);
  }, [tour]);

  return <div>product</div>;
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
