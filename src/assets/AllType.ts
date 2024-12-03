export type TProduct = {
  _id: string;
  image: string[];
  title: string;
  brand: string;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  discount?: number;
  offer?: boolean;
  offerDiscount?: number;
  isDeleted?: boolean;
};

export type TMeta = {
  totalPage: number;
  page: number;
  limit: number;
  total: number;
};

export type TCart = {
  _id: string;
  product: TProduct;
  productQuantity: number;
  email: string;
  discountedPrice: number;
  OfferPrice: number;
  phoneNo: string;
  createdAt?: number;
  updatedAt?: number;
};
