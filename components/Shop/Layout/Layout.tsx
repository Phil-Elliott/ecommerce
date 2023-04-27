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
};

const Layout = ({
  children,
  tours,
  addFilterOption,
  removeFilterOption,
}: LayoutProps) => {
  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="fixed w-full z-40">
        <Header handleShowFilter={handleShowFilter} showFilter={showFilter} />
      </div>
      <div className="container mx-auto flex gap-12 pt-48 pb-32">
        {showFilter ? (
          <div className="w-1/4">
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
