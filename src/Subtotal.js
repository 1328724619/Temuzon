import React from "react";
import "./Subtotal.css";
import { NumericFormat } from "react-number-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./Reducer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faTruck, 
  faShieldAlt,
  faCreditCard,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  
  const subtotal = getBasketTotal(basket);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="subtotal">
      <div className="subtotal__summary">
        <div className="subtotal__row">
          <span>Subtotal ({basket.length} items)</span>
          <NumericFormat
            value={subtotal}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </div>
        
        <div className="subtotal__row">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'subtotal__free' : ''}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="subtotal__row">
          <span>Estimated Tax</span>
          <NumericFormat
            value={tax}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </div>

        <div className="subtotal__divider"></div>

        <div className="subtotal__row subtotal__total">
          <span>Total</span>
          <NumericFormat
            value={total}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </div>
      </div>

      <div className="subtotal__features">
        <div className="subtotal__feature">
          <FontAwesomeIcon icon={faBox} />
          <span>Free Returns</span>
        </div>
        <div className="subtotal__feature">
          <FontAwesomeIcon icon={faTruck} />
          <span>Fast Delivery</span>
        </div>
        <div className="subtotal__feature">
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>Secure Payment</span>
        </div>
      </div>

      <button 
        className="subtotal__checkoutButton"
        onClick={e => navigate('/payment')}
      >
        <span>Proceed to Checkout</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      <div className="subtotal__paymentMethods">
        <FontAwesomeIcon icon={faCreditCard} />
        <span>We accept all major credit cards</span>
      </div>
    </div>
  );
}

export default Subtotal;
