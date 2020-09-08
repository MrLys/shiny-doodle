import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
//import { loadStripe } from '@stripe/stripe-js';
//const publishableKey = loadStripe('pk_test_51HOKzrKXmkxDkHhHHsnadw8gZ323mcECdPmNOUmrfx8hfw30NueVELvX40MDusNYZahd6ZLICmdlBYzgJf50HK8b00nO9KC0ya');

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HOKzrKXmkxDkHhHHsnadw8gZ323mcECdPmNOUmrfx8hfw30NueVELvX40MDusNYZahd6ZLICmdlBYzgJf50HK8b00nO9KC0ya';
    const onToken = token => {
        console.log(token);
        alert('Paymen successful');
    };

    return (
        <StripeCheckout
            label='Pay now'
            name='Shiny doodle Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}/>
    )
};

export default StripeCheckoutButton;