import React, { useState, useEffect } from "react";
import axios from "axios";
import SneakerItem from "./SneakerItem";
import { useNavigate } from "react-router-dom";
import "./SneakerList.css"; // Importovanje CSS-a

function SneakerList({ isLoggedIn, addToCart }) {
  const [sneakers, setSneakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSneakers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("/api/sneakers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSneakers(response.data);
      } catch (error) {
        console.error("There was an error fetching the sneakers!", error);
        navigate("/login");
      }
    };

    fetchSneakers();
  }, [navigate]);

  return (
    <div className="sneaker-list">
      {sneakers.map((sneaker) => (
        <SneakerItem
          key={sneaker._id}
          sneaker={sneaker}
          isLoggedIn={isLoggedIn}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default SneakerList;
