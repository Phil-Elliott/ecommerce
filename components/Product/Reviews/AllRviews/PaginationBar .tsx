import React from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

type PaginationBarProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  ratingsQuantity: number;
};

const PaginationBar = ({
  page,
  setPage,
  ratingsQuantity,
}: PaginationBarProps) => {
  return (
    <div className="flex justify-center items-center space-x-3 pt-6">
      <div className="pr-2">
        <AiOutlineLeftCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
      </div>
      {Array.from(
        { length: Math.ceil(ratingsQuantity / 10) },
        (_, i) => i + 1
      ).map((num) => (
        <p
          key={num}
          className={`${
            num === page
              ? "text-white rounded-full bg-gray-700 px-2 py-0 cursor-pointer"
              : "text-black cursor-pointer px-2 py-0"
          }`}
          onClick={() => setPage(num)}
        >
          {num}
        </p>
      ))}
      <div className="pl-2">
        <AiOutlineRightCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            if (page < Math.ceil(ratingsQuantity / 10)) {
              setPage(page + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PaginationBar;
