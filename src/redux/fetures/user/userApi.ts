import { baseApi } from "../../api/baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
        };
      },
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: `/user/me`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetAllUserQuery, useGetMyProfileQuery } = UserApi;
