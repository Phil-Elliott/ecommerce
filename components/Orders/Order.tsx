import React, { useState } from "react";
import { OrderType } from "components/shared/Types/Types";
import { BiShow, BiHide } from "react-icons/bi";
import Item from "./Item";

interface OrderProps {
  order: OrderType;
}

const Order = ({ order }: OrderProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Removing 'ORD-' from orderNumber
  const refinedOrderNumber = order.orderNumber.replace("ORD-", "");

  // Format the date as MM/DD/YY
  const orderedDate = new Date(order.orderedAt);
  const dateStr = orderedDate.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full py-4 px-6 bg-white border-b-2 border-gray-200">
        <p className="hidden lg:block">{refinedOrderNumber}</p>
        <p className="hidden lg:block">{dateStr}</p>
        <p className="hidden lg:block">{order.orderStatus}</p>
        <p className="hidden lg:block">{order.shippingStatus}</p>
        <p className="hidden lg:block">${order.total.toFixed(2)}</p>
        <p className="hidden lg:block">{order.trackingNumber}</p>

        {/* mobile view */}
        <p className="lg:hidden">Order#: {refinedOrderNumber}</p>
        <p className="lg:hidden">Date: {dateStr}</p>
        <p className="lg:hidden">Status: {order.orderStatus}</p>
        <p className="lg:hidden">Shipping: {order.shippingStatus}</p>
        <p className="lg:hidden">Total: ${order.total.toFixed(2)}</p>
        {order.trackingNumber && (
          <p className="sm:hidden">Tracking: {order.trackingNumber}</p>
        )}
        {/* <button className="lg:block" onClick={() => console.log("return")}>
          <div
            onClick={() => console.log("cancel")}
            className="flex justify-center text-sm text-red-500 border-2 border-red-500 rounded px-1 py-1 transition duration-300 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-transparent"
          >
            <p>Cancel</p>
          </div>
        </button> */}
        <button className="lg:block" onClick={() => console.log("return")}>
          <div
            onClick={() => setShowDetails(!showDetails)}
            className="w-full lg:w-1/3 flex justify-center text-xl border-2 border-gray-700 rounded px-1 py-1 transition duration-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
          >
            {showDetails ? <BiHide className="" /> : <BiShow className="" />}
          </div>
        </button>
      </div>
      {showDetails && (
        <div className="border-b-2 border-gray-200 bg-gray-100">
          <h2 className="px-6 pt-4 text-xl font-bold">Shipping Details</h2>
          <div className="w-full lg:w-1/3 flex justify-center items-center px-6 py-4">
            <p className="bg-Primary px-6 py-4 rounded w-full">
              {order.shippingDetails.contactName}
              <br />
              {order.shippingDetails.addressLine1}
              {order.shippingDetails.addressLine2 && (
                <>
                  <br />
                  {order.shippingDetails.addressLine2}
                </>
              )}
              <br />
              {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
              {order.shippingDetails.postalCode}
              <br />
              {order.shippingDetails.country}
            </p>
          </div>

          <h2 className="px-6 py-4 text-xl font-bold">All Order Items</h2>
          {order.items.map((item) => (
            <Item
              key={item._id}
              item={item.product}
              quantity={item.quantity}
              orderStatus={order.orderStatus}
              total={order.total}
              orderedAt={order.orderedAt}
              orderNumber={order._id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Order;
