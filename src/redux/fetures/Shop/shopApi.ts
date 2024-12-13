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
    GetAllShop: builder.query({
      query: (args) => {
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
        return {
          url: "/shop",
          method: "GET",
          params: params,
        };
      },
    }),

    UpdateShop: builder.mutation({
      query: (id) => {
        return {
          url: `/shop/${id}`,
          method: "PATCH",
        };
      },
    }),
    DeleteShop: builder.mutation({
      query: (id) => {
        return {
          url: `/shop/${id}`,
          method: "DELETE",
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
export const {
  useCreateShopMutation,
  useGetShopByVendorQuery,
  useGetAllShopQuery,
  useDeleteShopMutation,
  useUpdateShopMutation,
} = ShopApi;
