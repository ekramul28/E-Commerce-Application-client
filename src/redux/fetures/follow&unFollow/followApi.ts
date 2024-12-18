import { baseApi } from "../../api/baseApi";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetIsFollow: builder.query({
      query: (data) => {
        const queryParams = new URLSearchParams(data).toString();
        return {
          url: `/follow/isFollow?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["follow"],
    }),
    Follow: builder.mutation({
      query: (data) => {
        return {
          url: `/follow`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["follow"],
    }),
    unFollow: builder.mutation({
      query: (data) => {
        return {
          url: `/follow/unFollow`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["follow"],
    }),
  }),
});

export const { useGetIsFollowQuery, useFollowMutation, useUnFollowMutation } =
  ReviewApi;
