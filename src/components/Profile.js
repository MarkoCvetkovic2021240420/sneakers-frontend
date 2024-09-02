import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Importovanje CSS-a za stilizaciju

function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // State za status poruku

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "/api/auth/change-password",
        { oldPassword, newPassword },
        config
      );
      //   alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setStatusMessage("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.response.data);
      //   alert("Failed to change password. Please try again.");
      setStatusMessage("Failed to change password. Please try again.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <h2>Change Password</h2>
      <div className="form-group">
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      <div>{statusMessage && <p>{statusMessage}</p>}</div>
    </div>
  );
}

export default Profile;
