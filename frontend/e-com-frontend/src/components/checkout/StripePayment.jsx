import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { createStripePaymentSecret } from "../../store/actions/index";
import {useEffect} from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export const StripePayment = () => {
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(clientSecret);
    console.log("Fetching client Secret with totalPrice as" + totalPrice);
    if(totalPrice > 0 && !clientSecret)
        dispatch(createStripePaymentSecret(totalPrice));
  }, [totalPrice]);
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
