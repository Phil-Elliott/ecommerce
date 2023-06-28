import React, { useEffect, useState } from "react";

import Items from "components/Shop/Items";
import Layout from "components/Shop/Layout/Layout";

import { FilteredOptionsProps, GameProps } from "components/shared/Types/Types";
import { useRouter } from "next/router";

type ShopProps = {
  games: GameProps[];
};

const shop = ({ games }: ShopProps) => {
  const [filteredGames, setFilteredGames] = useState<GameProps[]>(games);
  const [filterOptions, setFilterOptions] = useState<FilteredOptionsProps>({
    category: [],
    publisher: [],
    gameModes: [],
    platform: [],
    prices: [],
  });
  const [sortBy, setSortBy] = useState<string>("");

  // Gives the items time to get filtered
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setLoading(false);
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(filteredGames, "state changed");
    }, 1000);
  }, [filteredGames]);

  // Reading and setting query parameters
  const router = useRouter();

  const searchQuery = router.query.search as string;
  const filterQuery = router.query.category as string;
  const publisherQuery = router.query.publisher as string;

  // Once router is ready, set initial queries to actual query parameters
  useEffect(() => {
    if (router.isReady) {
      if (searchQuery && searchQuery.trim() !== "") {
        const searchedGames = games.filter((game) =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
        setFilteredGames(searchedGames);
        console.log(searchedGames);
      } else if (filterQuery && filterQuery.trim() !== "") {
        const newFilteredGames = games.filter((game) =>
          game.category.includes(filterQuery)
        );
        setFilteredGames(newFilteredGames);
        console.log(newFilteredGames, filteredGames);
      } else if (publisherQuery && publisherQuery.trim() !== "") {
        const newFilteredGames = games.filter((game) =>
          game.publisher ? game.publisher.includes(publisherQuery) : false
        );
        setFilteredGames(newFilteredGames);
        console.log(newFilteredGames);
      }
    }
  }, [router.isReady, router.query, searchQuery, filterQuery, publisherQuery]);

  // On change of sortBy, sort games accordingly
  useEffect(() => {
    if (sortBy === "") return;
    const sortedGames = [...filteredGames].sort((a, b) => {
      if (sortBy === "priceAsc") {
        return a.price - b.price;
      } else if (sortBy === "priceDesc") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    setFilteredGames(sortedGames);
  }, [sortBy]);

  // Function to add a filter option
  const addFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: [...prev[name], option],
    }));
  };

  // Function to remove a filter option
  const removeFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((item) => item !== option),
    }));
  };

  // Filter games based on the current filterOptions state
  useEffect(() => {
    if (
      filterOptions.category.length !== 0 ||
      filterOptions.publisher.length !== 0 ||
      filterOptions.gameModes.length !== 0 ||
      filterOptions.platform.length !== 0 ||
      filterOptions.prices.length !== 0
    ) {
      const filteredGames = games.filter((game) => {
        let isCategory = false;
        let isPublisher = false;
        let isGameModes = false;
        let isPlatform = false;
        let isPrices = false;

        if (
          filterOptions.category.length === 0 ||
          game.category.some((cat) => filterOptions.category.includes(cat))
        ) {
          isCategory = true;
        }

        if (
          filterOptions.publisher.length === 0 ||
          filterOptions.publisher.includes(game.publisher)
        ) {
          isPublisher = true;
        }

        if (filterOptions.gameModes.length === 0) {
          isGameModes = true;
        } else {
          game.gameModes.forEach((gameMode) => {
            if (filterOptions.gameModes.includes(gameMode)) {
              isGameModes = true;
            }
          });
        }

        if (
          filterOptions.platform.length === 0 ||
          filterOptions.platform.includes(game.platform)
        ) {
          isPlatform = true;
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

              if (game.price > lowerLimit) {
                console.log(game.price, lowerLimit);
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

              if (game.price >= lowerLimit && game.price <= upperLimit) {
                priceMatched = true;
              }
            }
          });

          isPrices = priceMatched;
        }

        return (
          isCategory && isPublisher && isGameModes && isPlatform && isPrices
        );
      });

      setFilteredGames(filteredGames);
    }
  }, [filterOptions]);

  return (
    <>
      {loading && (
        <Layout
          games={games}
          addFilterOption={addFilterOption}
          removeFilterOption={removeFilterOption}
          changeSortBy={(value: string) => setSortBy(value)}
          count={filteredGames?.length}
          sortBy={sortBy}
          searchQuery={searchQuery}
        >
          <Items games={filteredGames} />
        </Layout>
      )}
    </>
  );
};

export default shop;
