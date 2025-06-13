import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faHeartBroken, 
  faShoppingCart, 
  faStar,
  faExchangeAlt,
  faChartLine,
  faLeaf,
  faComments
} from '@fortawesome/free-solid-svg-icons';

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [environmentalScore, setEnvironmentalScore] = useState(0);
  const [aggregatedReviews, setAggregatedReviews] = useState([]);

  // Simulated price history data
  useEffect(() => {
    const generatePriceHistory = () => {
      const history = [];
      const basePrice = price;
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const randomVariation = (Math.random() - 0.5) * 10;
        history.push({
          date,
          price: basePrice + randomVariation
        });
      }
      return history;
    };

    setPriceHistory(generatePriceHistory());
    setEnvironmentalScore(Math.floor(Math.random() * 100));
    setAggregatedReviews([
      { platform: 'Amazon', rating: rating },
      { platform: 'Walmart', rating: rating - 0.5 },
      { platform: 'Target', rating: rating + 0.2 }
    ]);
  }, [price, rating]);

  const addToBasket = () => {
    // Dispatch item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, image, price, rating },
    });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleComparison = (e) => {
    e.stopPropagation();
    setShowComparison(!showComparison);
  };

  const getPriceTrend = () => {
    if (priceHistory.length < 2) return 'stable';
    const firstPrice = priceHistory[0].price;
    const lastPrice = priceHistory[priceHistory.length - 1].price;
    return lastPrice > firstPrice ? 'up' : lastPrice < firstPrice ? 'down' : 'stable';
  };

  return (
    <div 
      className="product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product__info">
        <p className="product__title">{title}</p>
        <div className="product__price">
          <small>$</small>
          <strong>{price}</strong>
          <span className={`price-trend ${getPriceTrend()}`}>
            <FontAwesomeIcon icon={faChartLine} />
          </span>
        </div>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="product__star" />
            ))}
        </div>
      </div>

      <div className="product__imageContainer">
        <img src={image} alt={title} className="product__image" />
        <button 
          className={`product__favorite ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartBroken} />
        </button>
      </div>

      <button 
        className={`product__addToCart ${isHovered ? 'show' : ''}`}
        onClick={addToBasket}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        Add to Cart
      </button>

      <button 
        className={`product__compare ${isHovered ? 'show' : ''}`}
        onClick={toggleComparison}
      >
        <FontAwesomeIcon icon={faExchangeAlt} />
        Compare
      </button>

      {showComparison && (
        <div className="product__comparison">
          <div className="comparison__section">
            <h3>Price History</h3>
            <div className="price-history-chart">
              {priceHistory.map((point, index) => (
                <div 
                  key={index}
                  className="price-point"
                  style={{
                    height: `${(point.price / price) * 100}%`,
                    left: `${(index / priceHistory.length) * 100}%`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="comparison__section">
            <h3>Environmental Impact</h3>
            <div className="environmental-score">
              <FontAwesomeIcon icon={faLeaf} />
              <span>{environmentalScore}/100</span>
            </div>
          </div>

          <div className="comparison__section">
            <h3>Multi-Platform Reviews</h3>
            <div className="aggregated-reviews">
              {aggregatedReviews.map((review, index) => (
                <div key={index} className="platform-review">
                  <FontAwesomeIcon icon={faComments} />
                  <span>{review.platform}: {review.rating.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
