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

export type Review = {
  createdAt: string;
  game: string;
  headline: string;
  _id: string;
  rating: number;
  review: string;
  user: {
    name: string;
    _id: string;
  };
  upVotes: string[];
  downVotes: string[];
  recommended: boolean;
};

export type UserReview = {
  headline: string;
  rating: number;
  review: string;
  _id: string;
};

export type FilterOption = {
  name: string;
  options: string[];
  show: boolean;
};

export type OrderType = {
  _id: string;
  orderedAt: string;
  orderNumber: string;
  orderStatus: string;
  orderStatusHistory: any[];
  shippingDetails: {
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    contactName: string;
    country: string;
    postalCode: string;
    state: string;
  };
  shippingStatus: string;
  total: number;
  trackingNumber: string | null;
  user: string;
  __v: number;
  items: {
    _id: string;
    quantity: number;
    price: number;
    product: {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string[];
    };
  }[];
};
