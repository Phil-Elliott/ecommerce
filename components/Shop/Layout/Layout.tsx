import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import { FilteredOptionsProps, GameProps } from "components/shared/Types/Types";

type LayoutProps = {
  children: React.ReactNode;
  games: GameProps[];
  addFilterOption: (name: keyof FilteredOptionsProps, option: string) => void;
  removeFilterOption: (
    name: keyof FilteredOptionsProps,
    option: string
  ) => void;
  changeSortBy: (value: string) => void;
  count: number;
  sortBy: string;
  searchQuery: string;
};

const Layout = ({
  children,
  games,
  addFilterOption,
  removeFilterOption,
  changeSortBy,
  count,
  sortBy,
  searchQuery,
}: LayoutProps) => {
  const [showFilter, setShowFilter] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <Header
        handleShowFilter={handleShowFilter}
        showFilter={showFilter}
        changeSortBy={changeSortBy}
        count={count}
        openMobileFilter={() => setIsMobileFilterOpen(true)}
        searchQuery={searchQuery}
      />
      <div className="container mx-auto flex gap-12 pt-4 lg:pt-48 pb-32">
        {showFilter ? (
          <Filter
            games={games}
            addFilterOption={addFilterOption}
            removeFilterOption={removeFilterOption}
            isMobileFilterOpen={isMobileFilterOpen}
            closeMobileFilter={() => setIsMobileFilterOpen(false)}
            changeSortBy={changeSortBy}
            sortBy={sortBy}
          />
        ) : null}
        {children}
      </div>
    </>
  );
};

export default Layout;
