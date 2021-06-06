const express = require("express")
const router = express.Router()
const paypal = require('paypal-rest-sdk')
const {clientID, clientSecret} = process.env
const Cart = require("../models/cart")

paypal.configure({
    'mode': 'sandbox',
    'client_id': clientID,
    'client_secret': clientSecret
})
// payment Page Redirect you to paypal

router.get('/pay', async (req, res) => {
    // console.log(req.query)
    // let cartItems = await Cart.findById(req.query).lean()
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Suneel",
                    "sku": Math.floor(Math.random() * 999999),
                    "price": "199",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "199"
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

// payment Success Page

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,

    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            res.send("Your Payment Has Been sucessfull")
        }
    });
});

// if payment cancelled

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router