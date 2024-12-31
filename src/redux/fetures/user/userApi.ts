import { baseApi } from "../../api/baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
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

        console.log(params.toString());
        return {
          url: `/user`,
          method: "GET",
          params: params,
        };
      },
    }),
    UpdateUser: builder.mutation({
      query: (formData) => {
        return {
          url: `/user`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    DeleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
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
export const {
  useGetAllUserQuery,
  useGetMyProfileQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = UserApi;
