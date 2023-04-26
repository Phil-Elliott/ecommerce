import React from "react";

import Items from "components/Shop/Items";
import Layout from "components/Shop/Layout/Layout";

import { TourProps } from "components/shared/Types/Types";

type ShopProps = {
  tours: TourProps[];
};

const shop = ({ tours }: ShopProps) => {
  return (
    <div className=" ">
      <Layout tours={tours}>
        <Items tours={tours} />
      </Layout>
    </div>
  );
};

export default shop;

/*

Make a layout for header and filter of shop page
Make the content the Children and wrap the layout around it

Make interfaces shared and import the tours interface to each one that needs it

Also fix the header on scroll down disappears and appears on scroll up

*/
