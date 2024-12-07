import { TQueryParam } from "@/app/redux/features/products/productApi";
import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/product",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllProductId: builder.query({
      query: (args) => {
        // Ensure args is an array of { name: string, value: any }
        console.log("Query Arguments:", args);

        const params = new URLSearchParams();

        // Append each parameter to the URLSearchParams object
        if (args && Array.isArray(args)) {
          args.forEach((item) => {
            if (
              item.value !== undefined &&
              item.value !== null &&
              item.value !== ""
            ) {
              params.append(item.name, String(item.value)); // Ensure value is a string
            }
          });
        }

        console.log("Constructed Params:", params.toString());

        return {
          url: `/product?${params.toString()}`, // Include query parameters in the URL
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
