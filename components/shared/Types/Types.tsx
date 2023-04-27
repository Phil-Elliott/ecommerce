export type TourProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  location: string;
  duration: string;
  date: string;
  rating: number;
  availability: number;
  groupSize: number;
  difficulty: string;
  activities: string[];
};

export type FilteredOptionsProps = {
  category: string[];
  location: string[];
  activities: string[];
  difficulty: string[];
  prices: string[];
};
