
require('dotenv').config()
const router = require("express").Router();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.REACT_APP_STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.PaymentIntent.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
