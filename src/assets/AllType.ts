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
  vendorId: string;
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
  id: string;
  product: TProduct;
  quantity: number;
  status?: string;
  email: string;
  offerDiscount: string;
  OfferPrice: number;
  phoneNo: string;
  createdAt?: number;
  updatedAt?: number;
};
