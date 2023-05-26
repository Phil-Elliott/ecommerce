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
  const [sortBy, setSortBy] = useState<string>("releaseDate");

  const router = useRouter();
  const searchQuery = router.query.search as string;

  const [initialSearchQuery, setInitialSearchQuery] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setInitialSearchQuery(searchQuery);
    }
  }, [router.isReady, searchQuery]);

  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery.trim() !== "") {
      const searchedGames = games.filter((game) =>
        game.name
          .toLowerCase()
          .includes(initialSearchQuery.toLowerCase().trim())
      );
      setFilteredGames(searchedGames);
    } else {
      setFilteredGames(games);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    const sortedGames = [...filteredGames].sort((a, b) => {
      if (sortBy === "releaseDate") {
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
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
    setFilteredGames(sortedGames);
  }, [sortBy]);

  const addFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: [...prev[name], option],
    }));
  };

  const removeFilterOption = (
    name: keyof FilteredOptionsProps,
    option: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [name]: prev[name].filter((item) => item !== option),
    }));
  };

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      let isCategory = false;
      let isPublisher = false;
      let isGameModes = false;
      let isPlatform = false;
      let isPrices = false;

      if (
        filterOptions.category.length === 0 ||
        filterOptions.category.includes(game.category)
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

      return isCategory && isPublisher && isGameModes && isPlatform && isPrices;
    });

    setFilteredGames(filteredGames);
  }, [filterOptions, games]);

  return (
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
  );
};

export default shop;
