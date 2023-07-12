export type GameProps = {
  _id: string;
  name: string;
  image: string[];
  price: number;
  description: string;
  category: string[];
  publisher: string;
  releaseDate: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  starRatings: Record<string, number>;
  playerCount: number;
  platform: string;
  gameModes: string[];
  stock: number;
  quantity?: number;
};

export type FilteredOptionsProps = {
  category: string[];
  publisher: string[];
  gameModes: string[];
  platform: string[];
  prices: string[];
};
