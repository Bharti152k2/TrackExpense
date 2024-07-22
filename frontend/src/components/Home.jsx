import React, { useState } from "react";
import "../css/home.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";

function home() {
  return (
    <>
      <div className="background">
        <h1>Welcome to Expense Tracker</h1>
        <div>
          <p>Platform where you can calculate and</p>
          <p>
            <p>track your Expenses</p>
          </p>
        </div>
        <button>
          <NavLink to="/expenses">Track</NavLink>
          <FaArrowTrendUp style={{ fontSize: "25px", color: "darkblue" }} />
        </button>
      </div>
    </>
  );
}

export default home;
