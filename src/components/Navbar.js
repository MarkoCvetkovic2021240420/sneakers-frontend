// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/register">Register</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importovanje CSS-a

function Navbar({ isLoggedIn, onLogout, userRole }) {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/sneakers" className="navbar-link">
            Sneakers
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar-item">
              <Link to="/cart" className="navbar-link">
                Cart
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">
                My Profile
              </Link>
            </li>
            {userRole === "admin" && (
              <li className="navbar-item">
                <Link to="/orders" className="navbar-link">
                  Orders
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === "admin" && (
              <li className="navbar-item">
                <Link to="/admin/products" className="navbar-link">
                  Manage Products
                </Link>
              </li>
            )}
            <li className="navbar-item">
              <span
                className="navbar-link"
                onClick={onLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
