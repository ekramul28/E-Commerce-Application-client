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
      providesTags: ["order"],
    }),
    CustomerOrderApi: builder.query({
      query: (id) => {
        return {
          url: `/order/customerOrder/${id}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    VendorOrderUpdate: builder.mutation({
      query: (data) => {
        return {
          url: `/order`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useVenderOrderApiQuery,
  useCustomerOrderApiQuery,
  useVendorOrderUpdateMutation,
} = OrderApi;
