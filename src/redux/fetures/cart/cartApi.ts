import { baseApi } from "../../api/baseApi";

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart", "cart2"],
    }),
    cartProduct: builder.query({
      query: (email) => ({
        url: `/cart/myCard`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    getAllProductPrice: builder.query({
      query: (email) => ({
        url: `/cart/price`,
        method: "GET",
      }),
      providesTags: ["cart2"],
    }),
    deleteProductCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["cart", "cart2"],
    }),

    updateProductCart: builder.mutation({
      query: (updateData) => ({
        url: `/cart/${updateData.id}`,
        method: "PATCH",
        body: updateData.data,
      }),
      invalidatesTags: ["cart", "cart2"],
    }),
  }),
});

export const {
  useCartProductQuery,
  useAddCartMutation,
  useDeleteProductCartMutation,
  useUpdateProductCartMutation,
  useGetAllProductPriceQuery,
} = CartApi;
