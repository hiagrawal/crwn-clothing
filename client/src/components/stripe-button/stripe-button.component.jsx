import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; //this muttiply by 100 is to convert it in cents
    const publishableKey = 'pk_test_51JdFHSSBOM29I0C8qtXfKXX2ZzTyMZdoDUQcTaYRrmMNgWGBqmrirRE9B2goFTzW186TZQXuZL9BGubkJ7SGS3Tc005QNUbhkL';

    const onToken = token => {
        axios({
            url : 'payment',
            method : 'post',
            data : {
                amount : priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful!!!');
        }).catch( error => {
            console.log("Payment error: ", error);
            alert('There was an issue with payment. Please make sure you use correct details');
        })
    }

    return (
        <StripeCheckout
        name="CRWN Clothing Ltd."
        label="Pay Now"
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        amount={priceForStripe} //cents
        description={`Your total is $${price}`}
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;