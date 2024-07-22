import React from "react";
import { NavLink } from "react-router-dom";
import "../css/expenses.css";

function Expenses() {
  return (
    <div className="expenses">
      <div className="side"></div>

      <div className="link">
        <p>
          Visit the links to add, view, update and delete expense. Also to see
          daily, weekly, monthly spending on particular category.
        </p>
        <NavLink to="/addexpenses">Add Expenses</NavLink>
        <NavLink to="/category">View and Manage Expenses</NavLink>
        <NavLink to="/spendings">View Spendings</NavLink>
      </div>
    </div>
  );
}

export default Expenses;
