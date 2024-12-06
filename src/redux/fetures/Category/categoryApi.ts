import { baseApi } from "../../api/baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
        };
      },
    }),
    getCategory: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useCreateCategoryMutation, useGetCategoryQuery } = CategoryApi;
