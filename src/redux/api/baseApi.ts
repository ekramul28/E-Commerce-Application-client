import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { logout, setUser } from "../fetures/Auth/authSlice";
interface ErrorResponse {
  message: string;
  status?: number;
  [key: string]: any;
}

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1",
  baseUrl: "https://e-commers-server-2.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  ErrorResponse
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const errorData = result.error.data as ErrorResponse;

    if (result.error.status === 404) {
      toast.error(errorData.message);
    }
    if (result.error.status === 403) {
      toast.error(errorData.message);
    }
    if (result.error.status === 401) {
      //* Send Refresh
      console.log("Sending refresh token");

      const res = await fetch(
        "https://e-commers-server-2.vercel.app/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["cart", "cart2", "order", "follow", "shop", "product"],

  endpoints: () => ({}),
});
