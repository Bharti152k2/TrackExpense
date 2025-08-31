import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/addExpenses.css";
import Select from "react-select";
import axios from "axios";
import { validateFormData } from "../data/expenseValidation";
import "../css/category.css";
import { useNavigate } from "react-router-dom";

let options = [
  { value: "", label: "Select category" },
  { value: "travel", label: "travel" },
  { value: "food", label: "food" },
  { value: "other", label: "Type you expense" },
];

function AddExpenses() {
  //! STATES
  let [startDate, setStartDate] = useState(new Date());
  let [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    date: new Date(),
    description: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [customCategory, setCustomCategory] = useState("");
  let [successMsg, setSuccessMsg] = useState("");

  //! FUNCTION TO HANDLE USER EXPENSE

  let getData = ({ target: { value, name } }) => {
    setExpenseData({ ...expenseData, [name]: value });
  };

  //^ FOR SELECT OPTION

  let getSelectOption = (selectedOption) => {
    if (selectedOption.value === "other") {
      setExpenseData({ ...expenseData, category: "other" });
    } else {
      setExpenseData({ ...expenseData, category: selectedOption.value });
    }
  };

  //^ FOR DATE

  let getDate = (date) => {
    setStartDate(date);
    setExpenseData({ ...expenseData, date: date });
  };

  //^ TO ADD EXPENSE

  let addExpense = async (e) => {
    e.preventDefault();

    let updatedExpenseData = {
      ...expenseData,
      category:
        expenseData.category === "other"
          ? customCategory
          : expenseData.category,
    };

    setformErrors(validateFormData(updatedExpenseData));
    // console.log(formErrors);
    let fdataLength = Object.keys(validateFormData(updatedExpenseData)).length;
    // console.log(fdataLength);
    if (fdataLength === 0) {
      try {
        let { data } = await axios.post(
          `https://expense-tracker-backend-ufdt.onrender.com/api/addexpense`,
          updatedExpenseData
        );
        setSuccessMsg(data.message);

        setExpenseData({
          category: "",
          amount: "",
          date: new Date(),
          description: "",
        });
        setCustomCategory("");
        setStartDate(new Date());
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="expense-div">
        <h1>Add Your Expense</h1>
        <form className="expense-form">
          <label htmlFor="">Category:</label>
          <Select
            className="select"
            defaultValue={options[0]}
            options={options}
            onChange={getSelectOption}
            name="category"
          />
          {expenseData.category === "other" && (
            <input
              type="text"
              placeholder="Enter custom category"
              name="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.category}
          </small>
          <div className="amount-div">
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              placeholder="example:100 "
              name="amount"
              id="amount"
              value={expenseData.amount}
              onChange={getData}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.amount}
          </small>

          <div className="date-divs">
            <label>Date: </label>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={getDate}
              maxDate={new Date()}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.date}
          </small>
          <label htmlFor="desc">Description:</label>
          <textarea
            name="description"
            id="desc"
            value={expenseData.description}
            onChange={getData}
          ></textarea>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.description}
          </small>
          <button type="submit" onClick={addExpense}>
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
}

export default AddExpenses;
