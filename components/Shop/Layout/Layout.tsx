import React from "react";
import Header from "./Header";
import Filter from "./Filter";
import { TourProps } from "components/shared/Types/Types";

type LayoutProps = {
  children: React.ReactNode;
  tours: TourProps[];
};

const Layout = ({ children, tours }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex gap-12">
        <div className="w-1/4">
          <Filter tours={tours} />
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
