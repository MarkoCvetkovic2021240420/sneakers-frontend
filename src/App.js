import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SneakerList from "./components/SneakerList";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Profile from "./components/Profile"; // Importovanje Profile komponente
import "./components/Navbar.css"; // Importovanje CSS-a za Navbar
import AllProducts from "./components/AllProducts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState("guest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("guest");
  };

  const addToCart = (sneaker, size) => {
    const newCartItem = { ...sneaker, size };
    setCart([...cart, newCartItem]);
    alert("Item added to cart!");
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  };

  return (
    <Router>
      <div className="App">
        {/* <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> */}
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userRole={userRole}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
            }
          />
          <Route
            path="/sneakers"
            element={
              <PrivateRoute>
                <SneakerList isLoggedIn={isLoggedIn} addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart
                  cart={cart}
                  setCart={setCart}
                  removeFromCart={removeFromCart}
                />
              </PrivateRoute>
            }
          />
          {isLoggedIn && userRole === "admin" && (
            <Route path="/orders" element={<Orders />} />
          )}
          <Route
            path="/admin/products"
            element={
              <PrivateRoute userRole={userRole} requiredRole="admin">
                <AllProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />{" "}
          {/* Dodata ruta za profil */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
