import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import { TourProps } from "components/shared/Types/Types";

type LayoutProps = {
  children: React.ReactNode;
  tours: TourProps[];
};

const Layout = ({ children, tours }: LayoutProps) => {
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
            <Filter tours={tours} />
          </div>
        ) : null}
        {children}
      </div>
    </>
  );
};

export default Layout;
