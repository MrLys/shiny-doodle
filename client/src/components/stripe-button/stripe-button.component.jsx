import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

//import { loadStripe } from '@stripe/stripe-js';
//const publishableKey = loadStripe('pk_test_51HOKzrKXmkxDkHhHHsnadw8gZ323mcECdPmNOUmrfx8hfw30NueVELvX40MDusNYZahd6ZLICmdlBYzgJf50HK8b00nO9KC0ya');

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HOKzrKXmkxDkHhHHsnadw8gZ323mcECdPmNOUmrfx8hfw30NueVELvX40MDusNYZahd6ZLICmdlBYzgJf50HK8b00nO9KC0ya";
  const onToken = (token) => {
      axios({
        url: '/payment',
          method: 'post',
          data: {
            amount: priceForStripe,
            token
          },
      }).then(response => alert('Payment successful'))
          .catch(error => {
              console.log('Payment error: ', error);
              alert('There was an issue with your payment. Please make sure you use the provided credit card');
          });
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="Shiny doodle Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
