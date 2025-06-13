import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51RUpyvDFZQyE4fiLjbfMrSJ2KjzH1l3d1qjYn3HnsUmBDJuIcTkOySxcKdDSTKiU7xfjORGaq4GC2FFTbArFFJT7003oAbeUKK"
);

function MainLayout({ isMenuOpen, toggleMenu, theme, toggleTheme }) {
  const location = useLocation();

  const getHeaderBackgroundColor = () => {
    switch (location.pathname) {
      case '/':
        return 'var(--neutral-50)'; // Home page background color (white in light, dark in dark)
      case '/checkout':
        return 'var(--neutral-50)'; // Checkout page header (white in light, dark in dark)
      case '/login':
        return 'var(--neutral-50)'; // Login page header (white in light, dark in dark)
      case '/payment':
        return 'var(--neutral-50)'; // Payment page header (white in light, dark in dark)
      case '/orders':
        return 'var(--neutral-50)'; // Orders page header (white in light, dark in dark)
      default:
        return 'var(--neutral-50)'; // Default header color (white in light, dark in dark)
    }
  };

  return (
    <div className={`app ${isMenuOpen ? 'menu-open' : ''} ${theme}-mode`}>
      <Header 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={toggleMenu} 
        headerBgColor={getHeaderBackgroundColor()} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <>
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <Payment theme={theme} />
            </Elements>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Orders />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  const [{}, dispatch] = useStateValue();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    // will only run once when the app component loads...
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("The User is >>> ", authUser);

      if (authUser) {
        // the user is logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <MainLayout isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
