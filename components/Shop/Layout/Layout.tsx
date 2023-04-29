import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import { FilteredOptionsProps, TourProps } from "components/shared/Types/Types";

type LayoutProps = {
  children: React.ReactNode;
  tours: TourProps[];
  addFilterOption: (name: keyof FilteredOptionsProps, option: string) => void;
  removeFilterOption: (
    name: keyof FilteredOptionsProps,
    option: string
  ) => void;
  changeSortBy: (value: string) => void;
  count: number;
  sortBy: string;
};

const Layout = ({
  children,
  tours,
  addFilterOption,
  removeFilterOption,
  changeSortBy,
  count,
  sortBy,
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
      />
      <div className="container mx-auto flex gap-12 pt-4 lg:pt-48 pb-32">
        {showFilter ? (
          <Filter
            tours={tours}
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

/*

- Have sortby disapear on smaller screen 
- Create a responsive filter that takes up full screen on mobile (will include sortby)


Header 
justify-between result num and filter button


*/
