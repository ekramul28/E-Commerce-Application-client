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
      invalidatesTags: ["product"],
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
              item.value !== "" &&
              !(
                Array.isArray(item.value) &&
                item.value.every((val: number) => val === 0)
              )
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
      providesTags: ["product"],
    }),

    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});
export const {
  useCreateProductMutation,
  useGetAllProductIdQuery,
  useGetProductByIdQuery,
} = ProductApi;
