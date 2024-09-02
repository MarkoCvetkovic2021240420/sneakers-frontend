import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Import CSS for styling

function Cart({ cart, setCart, removeFromCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveItem = (index) => {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const order = {
      customer: { name, email, address },
      items: cart,
      total: totalPrice,
    };
    try {
      const response = await axios.post("/api/orders", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Dodajemo logovanje odgovora
      alert("Order placed successfully!");
      setCart([]); // Ispraznite korpu nakon uspešne narudžbine
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.size}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Price: ${totalPrice}</h2>
          <div className="order-form">
            <h2>Order Information</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
