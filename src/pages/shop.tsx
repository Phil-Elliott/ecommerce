import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Items from "components/Shop/Items";
import Layout from "components/Shop/Layout/Layout";
import {
  FilterOption,
  FilteredOptionsProps,
  GameProps,
} from "components/shared/Types/Types";
import { useRouter } from "next/router";
import { PaginationBar } from "components/shared";
import queryString from "query-string";
import { Spinner } from "components/shared";
import Head from "next/head";

const shop = () => {
  const [filteredGames, setFilteredGames] = useState<GameProps[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilteredOptionsProps>({
    category: [],
    publisher: [],
    gameModes: [],
    platform: [],
    prices: [],
  });

  const [sortBy, setSortBy] = useState<string>("-ratingsAverage");
  const [page, setPage] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(0);
  const [hasInitialFiltersSet, setHasInitialFiltersSet] =
    useState<boolean>(false);
  const [filterOptionsData, setFilterOptionsData] = useState<FilterOption[]>([
    {
      name: "Category",
      options: [],
      show: true,
    },
    {
      name: "Publisher",
      options: [],
      show: true,
    },
    {
      name: "Game Modes",
      options: [],
      show: true,
    },
    {
      name: "Platform",
      options: [],
      show: true,
    },
    {
      name: "Prices",
      options: [],
      show: true,
    },
  ]);

  const ref = useRef<HTMLDivElement>(null);

  // Gives the items time to get filtered
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const gameModes = ["Single Player", "Multiplayer"];
    const prices = [
      "$0 - $50",
      "$50 - $100",
      "$100 - $150",
      "$150 - $200",
      "Over $200",
    ];

    async function getFilterOptionsData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/games/filterOptions`
        );
        const data = await response.data.data;

        setFilterOptionsData((prev) => [
          {
            name: "Category",
            options: data.categories,
            show: true,
          },
          {
            name: "Publisher",
            options: data.publishers,
            show: true,
          },
          {
            name: "Game Modes",
            options: gameModes,
            show: true,
          },
          {
            name: "Platform",
            options: data.platforms,
            show: true,
          },
          {
            name: "Prices",
            options: prices,
            show: true,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }

    getFilterOptionsData();
  }, []);

  // Reading search query
  const router = useRouter();

  // const searchQuery = router.query.search as string;

  const searchQuery = router.query.search ? router.query.search.toString() : "";
  const filterQuery = router.query.category
    ? router.query.category.toString()
    : "";
  const publisherQuery = router.query.publisher
    ? router.query.publisher.toString()
    : "";

  useEffect(() => {
    if (router.isReady && !hasInitialFiltersSet) {
      if (filterQuery && filterQuery.trim() !== "") {
        addFilterOption("category", filterQuery);
      } else if (publisherQuery && publisherQuery.trim() !== "") {
        addFilterOption("publisher", publisherQuery);
      } else {
        getGames();
      }
    }
    setHasInitialFiltersSet(true);
  }, [router.isReady, hasInitialFiltersSet, filterQuery, publisherQuery]);

  const getGames = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = queryString.stringify(filterOptions, {
        arrayFormat: "comma",
      });
      const response = await axios.get(
        `http://localhost:3000/api/v1/games?page=${page}&limit=9&sort=${sortBy}&search=${searchQuery}&${queryParams}`
      );
      const data = await response.data;
      setQuantity(data.totalProducts);
      setFilteredGames(data.data.data);
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [sortBy, filterOptions, searchQuery, page]);

  // Fetches the games from the database the page, sort, and filter options change
  useEffect(() => {
    if (hasInitialFiltersSet) {
      getGames();
    }
  }, [page]);

  useEffect(() => {
    if (hasInitialFiltersSet) {
      setPage(1);
    }
  }, [hasInitialFiltersSet, sortBy, filterOptions, searchQuery]);

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

  return (
    <div ref={ref}>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Take a look at what we sell" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner size={150} />
      ) : (
        <Layout
          addFilterOption={addFilterOption}
          removeFilterOption={removeFilterOption}
          changeSortBy={(value: string) => setSortBy(value)}
          count={quantity}
          sortBy={sortBy}
          searchQuery={searchQuery}
          filterOptions={filterOptions}
          filterOptionsData={filterOptionsData}
          setFilterOptionsData={setFilterOptionsData}
        >
          {filteredGames.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-2xl font-semibold">
                No games match your search criteria
              </h1>
            </div>
          ) : (
            <div>
              <Items games={filteredGames} />
              {quantity <= 9 ? null : (
                <PaginationBar
                  page={page}
                  setPage={setPage}
                  quantity={quantity}
                  displayQuantity={9}
                />
              )}
            </div>
          )}
        </Layout>
      )}
      )
    </div>
  );
};

export default shop;
