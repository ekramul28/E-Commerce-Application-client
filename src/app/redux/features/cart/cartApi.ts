import { baseApi } from "../../api/baseApi";

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cartProduct: builder.query({
      query: (email) => ({
        url: `/cart/userCard`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart", "cart2"],
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
  useAddProductMutation,
  useDeleteProductCartMutation,
  useUpdateProductCartMutation,
  useGetAllProductPriceQuery,
} = CartApi;
