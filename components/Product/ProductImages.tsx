import React from "react";

import { CldImage } from "next-cloudinary";
import { GameProps } from "components/shared/Types/Types";

type ProductImagesProps = {
  game: GameProps | null;
  mainImage: string | null;
  setMainImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProductImages = ({
  game,
  mainImage,
  setMainImage,
}: ProductImagesProps) => {
  return (
    <div className="order-2 lg:order-none grid grid-cols-6 lg:grid-cols-1 lg:grid-rows-6 gap-3 sm:gap-5 h-full max-h-[70vh] w-full">
      {game?.image.map((img, index) => (
        <CldImage
          key={index}
          src={img}
          width="600"
          height="600"
          alt="Game picture"
          className={`w-full h-20 object-cover rounded-lg cursor-pointer sm:p-2 ${
            mainImage === img ? "border-2 border-gray-200" : ""
          }`}
          onClick={() => setMainImage(img)}
        />
      ))}
    </div>
  );
};

export default ProductImages;
