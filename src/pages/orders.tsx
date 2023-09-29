import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import Order from "components/Orders/Order";
import { OrderType } from "components/shared/Types/Types";
import { Spinner } from "components/shared";

const orders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector((state: any) => state.user);

  // Get the orders from the database when page loads
  useEffect(() => {
    setLoading(true);

    async function getOrders() {
      try {
        const response = await axios.get(
          `https://ecommercebackend-production-40c6.up.railway.app/api/v1/orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.data.orders);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    }

    getOrders();
  }, [user]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Head>
        <title>Orders</title>
        <meta name="description" content="Find your orders information here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner size={150} />
      ) : (
        <div className="container mx-auto min-h-screen pb-10 pt-28 ">
          <div className="bg-white w-full rounded shadow">
            <h1 className="text-3xl mb-0 py-4 px-6">Your Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center w-full py-4 px-6 border-b-2 border-gray-200">
              <p className="hidden lg:block">Order #</p>
              <p className="hidden lg:block">Date</p>
              <p className="hidden lg:block">Status</p>
              <p className="hidden lg:block">Shipping</p>
              <p className="hidden lg:block">Total</p>
              <p className="hidden lg:block">Track</p>
              <p className="hidden lg:block"></p>
            </div>
            <div className="">
              {orders.length > 0 ? (
                orders.map((order) => <Order key={order._id} order={order} />)
              ) : (
                <p className="p-20 text-center">Your orders are empty</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default orders;
