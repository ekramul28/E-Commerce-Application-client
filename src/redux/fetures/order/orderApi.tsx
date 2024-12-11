import { baseApi } from "../../api/baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    VenderOrderApi: builder.query({
      query: (data) => {
        return {
          url: "/order",
          method: "GET",
        };
      },
    }),
    CustomerOrderApi: builder.query({
      query: (id) => {
        return {
          url: `/order/customerOrder/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useVenderOrderApiQuery, useCustomerOrderApiQuery } = OrderApi;
