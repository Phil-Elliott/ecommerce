import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import Item from "components/Orders/Item";
import { Order } from "components/shared/Types/Types";

const orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const user = useSelector((state: any) => state.user);

  // Get the orders from the database when page loads
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `http://localhost:4242/api/v1/orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.data.orders);
      } catch (error) {
        console.log(error);
      }
    }

    getOrders();
  }, [user]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Orders</title>
        <meta name="description" content="Find your orders information here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto min-h-screen pb-10 pt-28 ">
        <div className="bg-white w-full rounded">
          <h1 className="text-3xl mb-0 py-4 px-6">Your Orders</h1>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 items-center w-full py-4 px-6 border-b-2 border-gray-200">
            <p className="col-span-2">Item</p>
            <p className="hidden lg:block">Price</p>
            <p className="hidden sm:block">Quantity</p>
            {/* <p className="hidden sm:block">Total</p> */}
            <p className="hidden sm:block">Status</p>
          </div>
          <div className="">
            {orders.length > 0 ? (
              orders.map((order) =>
                order.items.map((item) => (
                  <Item
                    key={item._id}
                    item={item.product}
                    quantity={item.quantity}
                    orderStatus={order.orderStatus}
                    total={order.total}
                    orderedAt={order.orderedAt}
                    orderNumber={order._id}
                  />
                ))
              )
            ) : (
              <p className="p-20 text-center">Your orders are empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default orders;

/*

1) Pull orders from the database
2) Display the orders in a table




*/
