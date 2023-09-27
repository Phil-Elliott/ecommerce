import React from "react";
import { CldImage } from "next-cloudinary";
import router from "next/router";

type ItemProps = {
  item: {
    description: string;
    image: string[];
    name: string;
    price: number;
    _id: string;
  };
  orderStatus: string;
  total: number;
  orderedAt: string;
  quantity: number;
  orderNumber: string;
};

const Item = ({
  item,
  orderStatus,
  total,
  orderedAt,
  quantity,
  orderNumber,
}: ItemProps) => {
  return (
    <div
      key={item._id}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 w-full py-4 bg-white rounded border-b-2 border-gray-200"
    >
      <div className="col-span-2 space-y-5">
        <div className="flex space-x-10">
          <CldImage
            src={item.image[0] || "2"}
            width="100"
            height="100"
            alt={item.name || "Product picture"}
            className="w-16 h-16"
          />
          <div className="text-sm space-y-2">
            <h2
              className="font-medium text-base cursor-pointer hover:text-red-500 transition duration-300"
              onClick={() =>
                router.push(`/product?id=${encodeURIComponent(item._id)}`)
              }
            >
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 block lg:hidden">
              Price: ${item.price}
            </p>
            <div className="flex block sm:hidden">
              <p>Quantity: {quantity}</p>
            </div>
            <div className="flex block sm:hidden">
              <p>Total: ${item.price * quantity}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 hidden lg:block">
        Price: ${item.price}
      </p>
      <div className="flex items-start hidden sm:block">
        <p>Quantity: {quantity}</p>
      </div>
      <div className="flex hidden sm:block">
        <p>Total: ${item.price * quantity}</p>
      </div>
    </div>
  );
};

export default Item;
