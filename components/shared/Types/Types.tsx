export type GameProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  publisher: string;
  releaseDate: string;
  rating: number;
  playerCount: number;
  platform: string;
  gameModes: string[];
};

export type FilteredOptionsProps = {
  category: string[];
  publisher: string[];
  gameModes: string[];
  platform: string[];
  prices: string[];
};
