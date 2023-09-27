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
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full py-4 px-6 bg-white border-b-2 border-gray-200">
        <p className="hidden sm:block">{refinedOrderNumber}</p>
        <p className="hidden sm:block">{dateStr}</p>
        <p className="hidden sm:block">{order.orderStatus}</p>
        <p className="hidden sm:block">{order.shippingStatus}</p>
        <p className="hidden sm:block">${order.total}</p>
        <p className="hidden sm:block">{order.trackingNumber}</p>
        <button
          className="hidden sm:block text-sm text-red-500 transition duration-300 border-2 border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-transparent"
          onClick={() => console.log("cancel")}
        >
          Cancel
        </button>
        <button
          className="hidden sm:block"
          onClick={() => console.log("return")}
        >
          <div
            onClick={() => setShowDetails(!showDetails)}
            className="text-xl inline-block align-middle border-2 border-gray-700 rounded px-1 py-1 transition duration-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
          >
            {showDetails ? <BiHide className="" /> : <BiShow className="" />}
          </div>
        </button>
      </div>
      {showDetails && (
        <div className="px-6">
          <h2 className="py-4 text-xl font-bold">Shipping Details</h2>
          <p>
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
          <h2 className="py-4 text-xl font-bold">All Order Items</h2>
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
