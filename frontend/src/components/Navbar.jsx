import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./Authentication";
import "../css/navbar.css";
import { MdOutlineAutoGraph } from "react-icons/md";

function Navbar() {
  let { isLoggin, logout } = useContext(AuthContext);

  return (
    <nav>
      <span>
        <h1>X</h1>
        <h2>pense</h2>
        <MdOutlineAutoGraph style={{ color: "lightblue", fontSize: "30px" }} />
      </span>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/expenses">Expenses</NavLink>
        {!isLoggin && <NavLink to="/signup">Signup</NavLink>}
        {!isLoggin && <NavLink to="/login">Login</NavLink>}
        {isLoggin && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
