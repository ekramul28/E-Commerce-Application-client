import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        console.log("inside api", data);
        return {
          url: "/product",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllProductId: builder.query({
      query: () => {
        return {
          url: `/product`,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useCreateProductMutation,
  useGetAllProductIdQuery,
  useGetProductByIdQuery,
} = ProductApi;
