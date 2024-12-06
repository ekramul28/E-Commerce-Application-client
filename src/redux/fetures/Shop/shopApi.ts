import { baseApi } from "../../api/baseApi";

const ShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => {
        return {
          url: "/shop",
          method: "POST",
          body: data,
        };
      },
    }),
    getShopByVendor: builder.query({
      query: (id) => {
        return {
          url: `/shop/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useCreateShopMutation, useGetShopByVendorQuery } = ShopApi;
