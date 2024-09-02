import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css"; // Stilovi za Orders komponentu

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  //   const handleRemoveItem = (orderId, itemId) => {
  //     const updatedOrders = orders.map((order) => {
  //       if (order._id === orderId) {
  //         return {
  //           ...order,
  //           items: order.items.filter((item) => item._id !== itemId),
  //         };
  //       }
  //       return order;
  //     });
  //     setOrders(updatedOrders);

  //     // Slanje zahteva za brisanje stavke sa servera (opciono)
  //     const token = localStorage.getItem("token"); // Pretpostavimo da ste token sačuvali u localStorage

  //     axios
  //       .delete(`/api/orders/${orderId}/remove-item`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         data: { itemId }, // Podaci koje šaljete sa DELETE zahtevom
  //       })
  //       .then((response) => {
  //         console.log("Item removed:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error removing item:", error);
  //       });
  //   };
  const handleRemoveOrder = (orderId) => {
    // Filtriraj iz stanja tako da izostaviš izbrisanu porudžbinu
    setOrders(orders.filter((order) => order._id !== orderId));

    // Pozovi API za brisanje porudžbine
    axios
      .delete(`/api/orders/${orderId}`)
      .then((response) => {
        console.log("Order removed:", response.data);
      })
      .catch((error) => {
        console.error("Error removing order:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer.name}</td>
              <td>{order.customer.email}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <p>
                        <strong>Product Name:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Brand:</strong> {item.brand}
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                      <p>
                        <strong>Price:</strong> ${item.price}
                      </p>
                      {/* <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(order._id, item._id)}
                      >
                        Remove Item
                      </button> */}
                    </div>
                  </div>
                ))}
              </td>
              <td>${order.total}</td>
              <td>
                {/* Dugme za brisanje porudžbine */}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveOrder(order._id)}
                >
                  Remove Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
