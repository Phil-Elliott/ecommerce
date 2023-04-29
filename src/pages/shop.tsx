import React, { useEffect, useState } from "react";

import Items from "components/Shop/Items";
import Layout from "components/Shop/Layout/Layout";

import { FilteredOptionsProps, TourProps } from "components/shared/Types/Types";
import Hero from "components/Home/Hero/Hero";

type ShopProps = {
  tours: TourProps[];
};

const shop = ({ tours }: ShopProps) => {
  const [filteredItems, setFilteredItems] = useState<TourProps[]>(tours);
  const [filterOptions, setFilterOptions] = useState<FilteredOptionsProps>({
    category: [],
    location: [],
    activities: [],
    difficulty: [],
    prices: [],
  });
  const [sortBy, setSortBy] = useState<string>("date");

  // sorts the tours based on the sortBy state
  useEffect(() => {
    const sortedTours = [...filteredItems].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "priceAsc") {
        return a.price - b.price;
      } else if (sortBy === "priceDesc") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    setFilteredItems(sortedTours);
  }, [sortBy]);

  // adds an option to the filterOptions object
  const addFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: [...prev[name], option],
    }));
  };

  // removes an option from the filterOptions object
  const removeFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((item) => item !== option),
    }));
  };

  // filters the tours based on the filterOptions
  useEffect(() => {
    const filteredTours = tours.filter((tour) => {
      let isCategory = false;
      let isLocation = false;
      let isActivities = false;
      let isDifficulty = false;
      let isPrices = false;

      if (filterOptions.category.length === 0) {
        isCategory = true;
      } else {
        filterOptions.category.forEach((category) => {
          if (tour.category === category) {
            isCategory = true;
          }
        });
      }

      if (filterOptions.location.length === 0) {
        isLocation = true;
      } else {
        filterOptions.location.forEach((location) => {
          if (tour.location === location) {
            isLocation = true;
          }
        });
      }

      if (filterOptions.activities.length === 0) {
        isActivities = true;
      } else {
        filterOptions.activities.forEach((activity) => {
          if (tour.activities.includes(activity)) {
            isActivities = true;
          }
        });
      }

      if (filterOptions.difficulty.length === 0) {
        isDifficulty = true;
      } else {
        filterOptions.difficulty.forEach((difficulty) => {
          if (tour.difficulty === difficulty) {
            isDifficulty = true;
          }
        });
      }

      if (filterOptions.prices.length === 0) {
        isPrices = true;
      } else {
        let priceMatched = false;

        filterOptions.prices.forEach((price) => {
          const priceParts = price.split("-");

          if (priceParts.length === 1) {
            const cleanedPricePart = priceParts[0]
              .replace(/[$,]/g, "")
              .replace("Over", "")
              .trim();
            const lowerLimit = parseInt(cleanedPricePart, 10);

            if (tour.price > lowerLimit) {
              console.log(tour.price, lowerLimit);
              priceMatched = true;
            }
          } else {
            const lowerLimit = parseInt(
              priceParts[0].replace(/[$,]/g, "").trim(),
              10
            );
            const upperLimit = parseInt(
              priceParts[1].replace(/[$,]/g, "").trim(),
              10
            );

            if (tour.price >= lowerLimit && tour.price <= upperLimit) {
              priceMatched = true;
            }
          }
        });

        isPrices = priceMatched;
      }

      return (
        isCategory && isLocation && isActivities && isDifficulty && isPrices
      );
    });

    setFilteredItems(filteredTours);
  }, [filterOptions]);

  return (
    <div className="">
      <Layout
        tours={tours}
        addFilterOption={addFilterOption}
        removeFilterOption={removeFilterOption}
        changeSortBy={(value: string) => setSortBy(value)}
        count={filteredItems.length}
        sortBy={sortBy}
      >
        <Items tours={filteredItems} />
      </Layout>
    </div>
  );
};

export default shop;

/*
1) Finish responsive filter
2) Make search work and connect to shop page
3) Maybe work on home page


*/
