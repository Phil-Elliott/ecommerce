import React from "react";

import { CldImage } from "next-cloudinary";
import { GameProps } from "components/shared/Types/Types";

type MainImageProps = {
  game: GameProps | null;
  mainImage: string | null;
};

const MainImage = ({ game, mainImage }: MainImageProps) => {
  return (
    <div className="order-1 h-full max-h-[70vh] lg:col-span-4">
      <CldImage
        src={mainImage || "2"}
        width="600"
        height="600"
        alt={game?.name || "Game picture"}
        className="w-full h-96 lg:h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default MainImage;
