import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProducts.css";

function AllProducts() {
  const [sneakers, setSneakers] = useState([]);
  const [newSneaker, setNewSneaker] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    image: "",
  });
  const [editingSneaker, setEditingSneaker] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const response = await axios.get("/api/sneakers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSneakers(response.data);
    } catch (error) {
      console.error("Failed to fetch sneakers", error);
    }
  };

  //   const handleInputChange = (e) => {
  //     setNewSneaker({ ...newSneaker, [e.target.name]: e.target.value });
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditModalOpen) {
      setEditingSneaker((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewSneaker((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddSneaker = async () => {
    try {
      await axios.post("/api/sneakers", newSneaker, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchSneakers(); // Ponovo preuzimanje svih proizvoda nakon dodavanja
      setNewSneaker({
        name: "",
        brand: "",
        size: "",
        price: "",
        image: "",
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add sneaker", error);
    }
  };

  const handleDeleteSneaker = async (id) => {
    try {
      await axios.delete(`/api/sneakers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchSneakers(); // Ponovo preuzimanje svih proizvoda nakon brisanja
    } catch (error) {
      console.error("Failed to delete sneaker", error);
    }
  };

  const handleDeleteClick = async (sneakerId) => {
    try {
      await axios.delete(`/api/sneakers/${sneakerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSneakers(sneakers.filter((s) => s._id !== sneakerId));
    } catch (error) {
      console.error("Error deleting sneaker:", error.message);
    }
  };

  const handleEditSneaker = async () => {
    try {
      await axios.put(`/api/sneakers/${editingSneaker._id}`, editingSneaker, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchSneakers(); // Ponovo preuzimanje svih proizvoda nakon izmene
      setIsEditModalOpen(false); // Zatvaranje modala nakon izmene
    } catch (error) {
      console.error("Failed to edit sneaker", error);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (sneaker) => {
    setEditingSneaker(sneaker);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="table-container">
        <h2>All Products</h2>
        <button className="add-button" onClick={openAddModal}>
          Add New Sneaker
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Size</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sneakers.map((sneaker) => (
              <tr key={sneaker._id}>
                <td>{sneaker.name}</td>
                <td>{sneaker.brand}</td>
                <td>{sneaker.size}</td>
                <td>${sneaker.price}</td>
                <td>
                  <img
                    src={sneaker.image}
                    alt={sneaker.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => openEditModal(sneaker)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(sneaker._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal za dodavanje novog proizvoda */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModals}>
              &times;
            </span>
            <h2>Add New Sneaker</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newSneaker.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newSneaker.brand}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="size"
              placeholder="Size"
              value={newSneaker.size}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newSneaker.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newSneaker.image}
              onChange={handleInputChange}
            />
            <button onClick={handleAddSneaker}>Add Sneaker</button>
          </div>
        </div>
      )}

      {/* Modal za izmenu proizvoda */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModals}>
              &times;
            </span>
            <h2>Edit Sneaker</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingSneaker.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={editingSneaker.brand}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="size"
              placeholder="Size"
              value={editingSneaker.size}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingSneaker.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={editingSneaker.image}
              onChange={handleInputChange}
            />
            <button onClick={handleEditSneaker}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
