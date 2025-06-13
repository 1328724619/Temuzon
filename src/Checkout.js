import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faTruck, 
  faCreditCard, 
  faCheckCircle,
  faRobot,
  faLeaf,
  faShieldAlt,
  faClock,
  faChartLine,
  faMagic,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [environmentalImpact, setEnvironmentalImpact] = useState(null);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '123 Main Street',
    city: 'Anytown',
    state: 'USA',
    zip: '12345',
  });
  const navigate = useNavigate();

  const steps = [
    { icon: faTruck, title: "Review Cart" },
    { icon: faMapMarkerAlt, title: "Shipping" },
    { icon: faCreditCard, title: "Payment" },
    { icon: faCheckCircle, title: "Confirmation" }
  ];

  // Simulate AI-powered features
  useEffect(() => {
    // Simulate delivery estimate calculation
    const calculateDelivery = () => {
      const now = new Date();
      const deliveryDate = new Date(now);
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 1);
      return deliveryDate;
    };

    // Simulate smart suggestions
    const generateSuggestions = () => {
      return [
        { type: 'complementary', text: 'Add a protective case for your device' },
        { type: 'sustainable', text: 'Choose eco-friendly packaging' },
        { type: 'savings', text: 'Save 15% with our loyalty program' }
      ];
    };

    // Simulate environmental impact calculation
    const calculateImpact = () => {
      return {
        carbonFootprint: Math.floor(Math.random() * 50) + 20,
        recycledMaterials: Math.floor(Math.random() * 100),
        renewableEnergy: Math.floor(Math.random() * 100)
      };
    };

    setDeliveryEstimate(calculateDelivery());
    setSmartSuggestions(generateSuggestions());
    setEnvironmentalImpact(calculateImpact());
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    setIsEditingShipping(false);
    // In a real application, you would save this to a backend or global state
  };

  const handleCancelEdit = () => {
    setIsEditingShipping(false);
    // Optionally reset to initial address if needed
  };

  const handleCheckout = () => {
    if (user && basket.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__background">
        <div className="checkout__particles"></div>
        <div className="checkout__gradient"></div>
      </div>

      <div className="checkout__container">
        <div className="checkout__header">
          <h1>Complete Your Order</h1>
          <div className="checkout__steps">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`checkout__step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className="step__icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout__content">
          <div className="checkout__main">
            <div className="checkout__section">
              <h2>
                <FontAwesomeIcon icon={faTruck} />
                Your Cart ({basket.length} items)
              </h2>
              {basket.map(item => (
                <div key={item.id} className="checkout__item">
                  <img src={item.image} alt={item.title} />
                  <div className="item__details">
                    <h3>{item.title}</h3>
                    <p className="item__price">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout__section">
              <h2>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Shipping Information
                <button className="edit__button" onClick={() => setIsEditingShipping(!isEditingShipping)}>
                  <FontAwesomeIcon icon={faPencilAlt} /> {isEditingShipping ? 'Done' : 'Edit'}
                </button>
              </h2>
              <div className="shipping__info">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Street Address:</strong> {shippingAddress.street}</p>
                <p><strong>City:</strong> {shippingAddress.city}</p>
                <p><strong>State/Province:</strong> {shippingAddress.state}</p>
                <p><strong>Zip/Postal Code:</strong> {shippingAddress.zip}</p>
              </div>
              {isEditingShipping && (
                <div className="shipping__form">
                  <label htmlFor="street">Street Address</label>
                  <input 
                    id="street"
                    type="text" 
                    name="street" 
                    value={shippingAddress.street} 
                    onChange={handleAddressChange} 
                    placeholder="123 Main Street"
                  />
                  <label htmlFor="city">City</label>
                  <input 
                    id="city"
                    type="text" 
                    name="city" 
                    value={shippingAddress.city} 
                    onChange={handleAddressChange} 
                    placeholder="Anytown"
                  />
                  <label htmlFor="state">State / Province</label>
                  <input 
                    id="state"
                    type="text" 
                    name="state" 
                    value={shippingAddress.state} 
                    onChange={handleAddressChange} 
                    placeholder="CA"
                  />
                  <label htmlFor="zip">Zip / Postal Code</label>
                  <input 
                    id="zip"
                    type="text" 
                    name="zip" 
                    value={shippingAddress.zip} 
                    onChange={handleAddressChange} 
                    placeholder="90210"
                  />
                  <div className="form__actions">
                    <button className="save__button" onClick={handleSaveAddress}>Save</button>
                    <button className="cancel__button" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout__section">
              <h2>
                <FontAwesomeIcon icon={faRobot} />
                Smart Delivery
              </h2>
              <div className="delivery__estimate">
                <div className="estimate__icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="estimate__details">
                  <h3>Estimated Delivery</h3>
                  <p>{deliveryEstimate?.toLocaleDateString()}</p>
                  <span className="estimate__note">Based on your location and current inventory</span>
                </div>
              </div>
            </div>

            <div className="checkout__section">
              <h2>
                <FontAwesomeIcon icon={faLeaf} />
                Environmental Impact
              </h2>
              <div className="environmental__impact">
                <div className="impact__metric">
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>Carbon Footprint: {environmentalImpact?.carbonFootprint}kg CO₂</span>
                </div>
                <div className="impact__metric">
                  <FontAwesomeIcon icon={faLeaf} />
                  <span>{environmentalImpact?.recycledMaterials}% Recycled Materials</span>
                </div>
                <div className="impact__metric">
                  <FontAwesomeIcon icon={faMagic} />
                  <span>{environmentalImpact?.renewableEnergy}% Renewable Energy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout__sidebar">
            <div className="checkout__summary">
              <h2>Order Summary</h2>
              <div className="summary__row">
                <span>Subtotal ({basket.length} items)</span>
                <span>${basket.reduce((amount, item) => amount + item.price, 0).toFixed(2)}</span>
              </div>
              <div className="summary__row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              <div className="summary__row">
                <span>Estimated Tax</span>
                <span>${(basket.reduce((amount, item) => amount + item.price, 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary__divider"></div>
              <div className="summary__row total">
                <span>Total</span>
                <span>${(basket.reduce((amount, item) => amount + item.price, 0) * 1.1).toFixed(2)}</span>
              </div>

              <div className="smart__suggestions">
                {smartSuggestions.map((suggestion, index) => (
                  <div key={index} className={`suggestion ${suggestion.type}`}>
                    <FontAwesomeIcon icon={faMagic} />
                    <span>{suggestion.text}</span>
                  </div>
                ))}
              </div>

              <button className="checkout__button" onClick={handleCheckout}>
                <FontAwesomeIcon icon={faShieldAlt} />
                Secure Checkout
              </button>

              <div className="checkout__security">
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
