// import React from "react";

// function SneakerItem({ sneaker }) {
//   return (
//     <div>
//       <h2>{sneaker.name}</h2>
//       <p>Brand: {sneaker.brand}</p>
//       <p>Size: {sneaker.size}</p>
//       <p>Price: ${sneaker.price}</p>
//     </div>
//   );
// }

// export default SneakerItem;
import React, { useState } from "react";
import "./SneakerItem.css"; // Importovanje CSS-a

function SneakerItem({ sneaker, isLoggedIn, addToCart }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addToCart(sneaker, selectedSize);
  };

  return (
    <div className="sneaker-item">
      <img src={sneaker.image} alt={sneaker.name} className="sneaker-image" />
      <div className="sneaker-details">
        <h2 className="sneaker-name">{sneaker.name}</h2>
        <p className="sneaker-brand">Brand: {sneaker.brand}</p>
        <p className="sneaker-price">Price: ${sneaker.price}</p>
        <div className="sneaker-size">
          <label htmlFor="size">Select Size:</label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="sneaker-select"
          >
            <option value="">Select Size</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
          </select>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SneakerItem;
