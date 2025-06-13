import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './Product';
import { useStateValue } from './StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain,
  faLightbulb,
  faShieldHalved,
  faUserAstronaut,
  faLaptop,
  faShirt,
  faHome,
  faWandMagicSparkles,
  faRocket,
  faMicrochip,
  faGamepad,
  faHeadphones
} from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [{ products }, dispatch] = useStateValue();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { 
      id: 'smart-tech',
      name: 'Smart Tech',
      icon: faLaptop,
      description: 'Cutting-edge devices and gadgets',
      color: '#6366f1'
    },
    { 
      id: 'ai-fashion',
      name: 'AI Stylist',
      icon: faShirt,
      description: 'AI-curated fashion and accessories',
      color: '#8b5cf6'
    },
    { 
      id: 'smart-home',
      name: 'Smart Home',
      icon: faHome,
      description: 'Intelligent home solutions',
      color: '#3b82f6'
    },
    { 
      id: 'beauty-ai',
      name: 'Beauty AI',
      icon: faWandMagicSparkles,
      description: 'Tech-enhanced beauty products',
      color: '#ec4899'
    },
    { 
      id: 'gaming',
      name: 'Gaming',
      icon: faGamepad,
      description: 'Next-gen gaming experience',
      color: '#f59e0b'
    },
    { 
      id: 'audio',
      name: 'Audio',
      icon: faHeadphones,
      description: 'Immersive sound technology',
      color: '#10b981'
    }
  ];

  const features = [
    {
      icon: faBrain,
      title: 'Smart Community',
      description: 'Join a network of tech enthusiasts sharing insights and discoveries'
    },
    {
      icon: faLightbulb,
      title: 'Innovation Hub',
      description: 'Discover cutting-edge products curated by our tech community'
    },
    {
      icon: faShieldHalved,
      title: 'Trust Network',
      description: 'Verified reviews and ratings from our community of experts'
    },
    {
      icon: faUserAstronaut,
      title: 'Future Tech',
      description: "Be among the first to experience tomorrow's technology today"
    }
  ];

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__categories">
          <h2 className="section__title">Explore Categories</h2>
          <p className="section__description">Discover our curated selection of innovative products</p>
          <div className="categories__grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category__card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ '--category-color': category.color }}
              >
                <div className="category__icon">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="category__overlay">
                  <span>Explore</span>
                  <FontAwesomeIcon icon={faRocket} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home__row">
          <div className="home__featured">
            <h2 className="section__title">Curated for You</h2>
            <p className="section__description">AI-powered recommendations based on your preferences</p>
            <div className="home__featuredGrid">
              <Product
                id="12321341"
                title="The Future of AI: Understanding Machine Learning and Deep Learning"
                price={29.99}
                rating={5}
                image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
              />
              <Product
                id="49538094"
                title="Smart Home Hub - Control Your Home with AI"
                price={199.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
              />
            </div>
          </div>
        </div>

        <div className="home__row">
          <div className="home__deals">
            <h2 className="section__title">Smart Deals</h2>
            <p className="section__description">AI-analyzed deals that match your shopping patterns</p>
            <div className="home__dealsGrid">
              <Product
                id="4903850"
                title="AI-Powered Smart Display"
                price={249.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
              />
              <Product
                id="23445930"
                title="Smart Speaker with Advanced AI Assistant"
                price={129.99}
                rating={5}
                image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
              />
              <Product
                id="3254354345"
                title="AI-Enhanced Tablet Pro"
                price={699.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
