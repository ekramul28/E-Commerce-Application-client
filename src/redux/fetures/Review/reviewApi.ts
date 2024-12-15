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
    }),
    Follow: builder.mutation({
      query: (data) => {
        return {
          url: `/follow`,
          method: "POST",
          body: data,
        };
      },
    }),
    unFollow: builder.mutation({
      query: (data) => {
        return {
          url: `/follow/unFollow`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetIsFollowQuery, useFollowMutation, useUnFollowMutation } =
  ReviewApi;
