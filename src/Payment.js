import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "./Reducer";
import axios from "./Axios";
import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faShoppingCart,
  faBoxOpen,
  faShieldAlt,
  faTag,
  faTruckFast,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const subtotal = getBasketTotal(basket);
  const shipping = 0; // Assuming free shipping for now
  const tax = subtotal * 0.1; // Example 10% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    //generate the special stipe secret which allows is to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${Math.round(total * 100)}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    // Only call getClientSecret if the basket is not empty and total is greater than 0
    if (basket.length > 0 && total > 0) {
      getClientSecret();
    } else if (basket.length === 0) {
        setClientSecret(''); // Clear client secret if basket is empty
    }

  }, [basket, total]);

  console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // paymentIntent = payment confirmation

    await setDoc(
      doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
      {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }
    );

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({
      type: "EMPTY_BASKET",
    });
    navigate("/orders", { replace: true });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__background"></div>
      <div className="payment__container">
        <div className="payment__left">
          <div className="payment__section payment__orderSummary">
            <h2><FontAwesomeIcon icon={faShoppingCart} /> Your Order Summary</h2>
            <div className="summary__items">
              {basket.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  hideButton
                />
              ))}
            </div>
            <div className="summary__details">
              <div className="summary__row">
                <span>Subtotal ({basket.length} items)</span>
                <NumericFormat
                  value={subtotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  renderText={(value) => <span>{value}</span>}
                />
              </div>
              <div className="summary__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary__row">
                <span>Estimated Tax</span>
                <NumericFormat
                  value={tax}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  renderText={(value) => <span>{value}</span>}
                />
              </div>
              <div className="summary__divider"></div>
              <div className="summary__row summary__total">
                <span>Order Total</span>
                <NumericFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  renderText={(value) => <strong>{value}</strong>}
                />
              </div>
              <div className="summary__security">
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>All transactions are secure and encrypted.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment__right">
          <div className="payment__section payment__delivery">
            <h2><FontAwesomeIcon icon={faTruckFast} /> Delivery Address</h2>
            <p>{user?.email}</p>
            <p>123 Main St</p>
            <p>Anytown, USA</p>
          </div>

          <div className="payment__section payment__method">
            <h2><FontAwesomeIcon icon={faCreditCard} /> Payment Method</h2>
            <form onSubmit={handleSubmit}>
              <div className="payment__cardElement">
                <CardElement onChange={handleChange} />
              </div>
              <div className="payment__priceContainer">
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded || basket.length === 0}
                >
                  <span>{processing ? <p>Processing</p> : `Buy Now (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)})`}</span>
                </button>
              </div>
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>

          <div className="payment__section payment__policy">
            <h2><FontAwesomeIcon icon={faCheckCircle} /> Our Policy</h2>
            <ul>
              <li><FontAwesomeIcon icon={faTag} /> Free Returns within 30 days</li>
              <li><FontAwesomeIcon icon={faShieldAlt} /> Secure Payment Processing</li>
              <li><FontAwesomeIcon icon={faBoxOpen} /> Quality Guarantee on all products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
