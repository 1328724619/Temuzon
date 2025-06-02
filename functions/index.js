const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51RUpyvDFZQyE4fiLfp4nyi9mxLhaodsVzZbMiaP4vvTTVG" +
    "5Bivy9qw1n6xWYmVO5S0afAmM9tmiLnxNgu9CawcvH00" +
  "13PiwExg",
);

const functions = require("firebase-functions");

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get(
    "/",
    (request, response) =>
      response
          .status(200)
          .send("hello world"),
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log(
      "Payment amount: $",
      (total / 100).toFixed(2),
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    // OK - Created

    response
        .status(201)
        .send(
            {
              clientSecret: paymentIntent.client_secret,
            },
        );
  } catch (error) {
    logger.error(
        "Error creating Payment Intent:",
        error,
        {structuredData: true},
    );
    response.status(500).send({
      error: error.message,
    });
  }
});

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/clone-d9244/us-central1/api
