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
};

const Layout = ({
  children,
  tours,
  addFilterOption,
  removeFilterOption,
  changeSortBy,
}: LayoutProps) => {
  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="fixed w-full z-40">
        <Header
          handleShowFilter={handleShowFilter}
          showFilter={showFilter}
          changeSortBy={changeSortBy}
          count={tours.length}
        />
      </div>
      <div className="container mx-auto flex gap-12 pt-48 pb-32">
        {showFilter ? (
          <div className="w-1/4 lg:block hidden">
            <Filter
              tours={tours}
              addFilterOption={addFilterOption}
              removeFilterOption={removeFilterOption}
            />
          </div>
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
