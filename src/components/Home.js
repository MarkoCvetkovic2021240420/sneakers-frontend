import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importovanje CSS-a

function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/sneakers");
  };

  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to the Nike Sneaker Store</h1>
      <p className="home-description">
        Discover the latest and greatest in Nike footwear. From classic designs
        to the newest releases, we have it all.
      </p>
      <button className="home-button" onClick={handleShopNow}>
        Shop Now
      </button>
    </div>
  );
}

export default Home;
