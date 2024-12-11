import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/amrPay",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { usePaymentMutation } = PaymentApi;
