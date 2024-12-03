import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useGetAllProductPriceQuery } from "../redux/features/cart/cartApi";
import { usePaymentMutation } from "../redux/features/payment/paymentApi";
import { toast } from "react-toastify";

const SubTotal = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const { data } = useGetAllProductPriceQuery(user?.email);
  const [payment, { isLoading }] = usePaymentMutation();
  const cartTotal = data?.data;
  console.log(cartTotal);
  const handelMakePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OEnEtL2pc8251OJIpKkvcI0a5dYheFy8fPTEUoGZcKf5ivh3KFiM2V2G7uP0ks4pIL9oViusE7QFpW76DP4I85100LbdwsY0M"
    );
    const body = {
      email: user?.email,
      total: cartTotal.total,
    };

    const session = await payment(body);

    if (cartTotal?.totalPrice < 10) {
      toast.error("No Product quantity ");
      return;
    }

    console.log(session);
    console.log(session?.data.data.id);
    if (stripe) {
      const result = stripe.redirectToCheckout({
        sessionId: session?.data.data.id,
      });
      console.log(result);
    } else {
      console.error("Stripe is not initialized.");
    }
  };
  return (
    <div>
      <div className="mt-8">
        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>£{cartTotal?.totalPrice}</dd>
              </div>

              <div className="flex justify-between">
                <dt>VAT</dt>
                <dd>£25</dd>
              </div>

              <div className="flex justify-between">
                <dt>Discount</dt>
                <dd>-£{cartTotal?.discountPrice}</dd>
              </div>

              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>£{cartTotal?.total}</dd>
              </div>
            </dl>

            <div className="flex justify-end">
              <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

                <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handelMakePayment}
                className="block rounded bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                {isLoading ? "Loading...." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTotal;
