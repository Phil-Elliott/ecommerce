import React from "react";
import axios, { AxiosError } from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { GameProps } from "components/shared/Types/Types";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CartSummaryProps = {
  cart: GameProps[];
};

const CartSummary = ({ cart }: CartSummaryProps) => {
  const user = useSelector((state: any) => state.user);

  const handleCheckout = async () => {
    // Check that the cart isn't empty
    if (cart.length === 0) return toast.error("Yours cart is empty");

    // Check that the user is logged in
    if (!user._id) return toast.error("You must be logged in to checkout");

    // Get Stripe.js instance
    const stripe = await stripePromise;

    try {
      // Make a call to the backend to get the checkout session
      const response = await axios.post(
        "http://localhost:4242/api/v1/orders/checkout-session",
        {
          cart: cart.map((item) => ({
            gameId: item._id,
            quantity: item.quantity,
          })),
        },
        {
          withCredentials: true,
        }
      );
      const session = response.data.session;

      // Check that stripe isn't null before using it
      if (stripe) {
        // When the checkout session is returned from your backend, redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          // Show an error to your customer
          console.error(result.error.message);
        }
      } else {
        console.error("Stripe has not been initialized correctly.");
      }
    } catch (error) {
      // Type assertion to ensure TypeScript knows the structure of the error object
      const axiosError = error as AxiosError;

      if (axiosError && axiosError.response && axiosError.response.data) {
        console.error("There was an issue:", axiosError.response.data);
      } else {
        console.error("There was an issue:", error);
      }
    }
  };

  return (
    <div className="bg-white w-full rounded mt-4 xl:mt-0">
      <ToastContainer />
      <h1 className="text-xl mb-0 border-b-2 border-gray-200 p-4">
        Order Summary
      </h1>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p>Subtotal</p>
          <p>
            $
            {cart
              .reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-gray-200">
          <p>Tax</p>
          <p>
            $
            {(
              cart.reduce(
                (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
                0
              ) * 0.06
            ).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p>Total</p>
          <p>
            {" "}
            $
            {(
              cart.reduce(
                (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
                0
              ) * 1.06
            ).toFixed(2)}
          </p>
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded hover:opacity-75"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
