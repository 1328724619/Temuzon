import "./App.css";
import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const [{}, dispatch] = useStateValue();

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

  return (
    <Router>
      <div className="app">
        <Header />
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
                <Payment />
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
    </Router>
  );
}

export default App;
