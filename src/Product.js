import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();
  const [clicked, setClicked] = useState(false);

  const addToBasket = () => {
    // Dispatch item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, image, price, rating },
    });
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Remove highlight after 300ms
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button
        className={clicked ? "addToBasket clicked" : "addToBasket"}
        onClick={addToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
