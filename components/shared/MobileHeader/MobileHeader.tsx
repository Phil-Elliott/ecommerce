import React from "react";
import { BsX } from "react-icons/bs";

type MobileHeaderProps = {
  isOpen: boolean;
  closeHandler: () => void;
  title: string;
  children: React.ReactNode;
};

const MobileHeader = ({
  isOpen,
  closeHandler,
  title,
  children,
}: MobileHeaderProps) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50 transition-opacity"
            onClick={closeHandler}
          />
          {/* Panel */}
          <div
            className={`relative w-full sm:w-1/2 md:w-1/3 bg-white h-full shadow-lg ${
              isOpen ? "open" : ""
            }`}
          >
            <div className="flex justify-between items-center px-4 py-4 border-b-2 border-gray-300">
              <h1 className="text-xl font-medium">{title}</h1>
              <button className="text-3xl" onClick={closeHandler}>
                <BsX />
              </button>
            </div>
            <div className="flex flex-col overflow-y-scroll h-full w-full scrollbar pb-20">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileHeader;
