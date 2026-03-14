import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPaymentMethod } from "../../store/actions/index";
import { toast } from "react-hot-toast";
import { createUserCart } from "../../store/actions/index";
import { useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method, toast));
  };
  useEffect(() => {
console.log("inside PaymentMethod before useEffect");
console.log("CART LENGHT = ",cart.length + "Cart Id" + cartId);
    if (cart.length > 0 && !cartId && !errorMessage) {
            console.log('creating a cart in backend');
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  },[]);
  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
      <FormControl>
        <RadioGroup
          aria-label="demo-controlled-radio-buttons-group"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            name="paymentMethod"
            control={<Radio />}
            label="Stripe"
          />
          <FormControlLabel
            value="Paypal"
            name="paymentMethod"
            control={<Radio />}
            label="Paypal"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
