import { baseApi } from "../../api/baseApi";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllAdmin: builder.query({
      query: () => {
        return {
          url: `/admin`,
          method: "GET",
        };
      },
    }),
    UpdateAdmin: builder.mutation({
      query: (data) => {
        return {
          url: `/admin`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});
export const { useGetAllAdminQuery, useUpdateAdminMutation } = AdminApi;
