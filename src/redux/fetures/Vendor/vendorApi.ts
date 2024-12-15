import { baseApi } from "../../api/baseApi";

const VendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateVendor: builder.mutation({
      query: (VendorData) => {
        return {
          url: `/user/create-vendor`,
          method: "POST",
          body: VendorData,
        };
      },
    }),
    UpdateVendor: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
        };
      },
    }),
    DeleteVendor: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} = VendorApi;
