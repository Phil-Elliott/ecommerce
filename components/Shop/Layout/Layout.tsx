import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import {
  FilterOption,
  FilteredOptionsProps,
} from "components/shared/Types/Types";

type LayoutProps = {
  children: React.ReactNode;
  addFilterOption: (name: keyof FilteredOptionsProps, option: string) => void;
  removeFilterOption: (
    name: keyof FilteredOptionsProps,
    option: string
  ) => void;
  changeSortBy: (value: string) => void;
  count: number;
  sortBy: string;
  searchQuery: string;
  filterOptions: FilteredOptionsProps;
  filterOptionsData: FilterOption[];
  setFilterOptionsData: React.Dispatch<React.SetStateAction<FilterOption[]>>;
};

const Layout = ({
  children,
  addFilterOption,
  removeFilterOption,
  changeSortBy,
  count,
  sortBy,
  searchQuery,
  filterOptions,
  filterOptionsData,
  setFilterOptionsData,
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
      <div
        className={`container mx-auto gap-12 pt-4 lg:pt-40 pb-32 ${
          showFilter ? "flex" : "block"
        }`}
      >
        {showFilter ? (
          <Filter
            addFilterOption={addFilterOption}
            removeFilterOption={removeFilterOption}
            isMobileFilterOpen={isMobileFilterOpen}
            closeMobileFilter={() => setIsMobileFilterOpen(false)}
            changeSortBy={changeSortBy}
            sortBy={sortBy}
            filterOptionsSelected={filterOptions}
            filterOptionsData={filterOptionsData}
            setFilterOptionsData={setFilterOptionsData}
          />
        ) : null}
        {children}
      </div>
    </>
  );
};

export default Layout;
