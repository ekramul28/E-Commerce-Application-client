export type TProduct = {
  id: string;
  images: string[];
  name: string;
  brand: string;
  shop: shop;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  discount?: number;
  offer?: boolean;
  offerDiscount?: number;
  isDeleted?: boolean;
};

export type shop = {
  id: string;
  logo: string;
  name: string;
};

export type ICategory = {
  id: string;
  image: string;
  name: string;
  offer: string;
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
