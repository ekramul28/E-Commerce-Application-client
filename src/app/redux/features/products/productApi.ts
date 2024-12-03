import { baseApi } from "../../api/baseApi";
export type TProduct = {
  _id: string;
  id: string;
  image: string[];
  title: string;
  brand: string;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  offerPrice?: number;
  discount: number;
  offer?: boolean;
  isDeleted?: boolean;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    product: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/medicine`,
          method: "GET",
          params: params,
        };
      },
    }),
    singleProduct: builder.query({
      query: (id) => ({
        url: `/medicine/${id}`,
        method: "GET",
      }),
    }),
    offerProduct: builder.query({
      query: () => ({
        url: "/medicine/offer",
        method: "GET",
      }),
    }),
  }),
});

export const { useProductQuery, useSingleProductQuery, useOfferProductQuery } =
  ProductApi;
