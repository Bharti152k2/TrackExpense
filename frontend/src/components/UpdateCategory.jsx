import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/addExpenses.css";
import Select from "react-select";
import axios from "axios";
import { validateFormData } from "../data/expenseValidation";
import { useNavigate, useParams } from "react-router-dom";

let options = [
  { value: "", label: "Select category" },
  { value: "travel", label: "travel" },
  { value: "food", label: "food" },
  { value: "other", label: "Type you expense" },
];

function UpdateCategory() {
  //! STATES
  let [startDate, setStartDate] = useState(new Date());
  let [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [customCategory, setCustomCategory] = useState("");
  let [successMsg, setSuccessMsg] = useState("");
  let { id } = useParams();
  let navigateToExpenses = useNavigate();

  //! TO CHANGE THE VALUES
  let changeExpense = ({ target: { name, value } }) => {
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

  //^ FOR DATE CHANGE

  let handleDateChange = (date) => {
    setStartDate(date);
    setExpenseData({ ...expenseData, date });
  };

  //! TO GET THE SINGLE DATA

  let getSingleExpense = async () => {
    try {
      let { data } = await axios.get(
        `https://expense-tracker-backend-ufdt.onrender.com/api/getoneexpense/${id}`
      );
      console.log(data);
      setExpenseData(data);
      setStartDate(new Date(data.date));
      setCustomCategory(data.category === "other" ? data.customCategory : "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleExpense();
  }, [id]);

  //! TO UPDATE EXPENSE

  let updateExpense = async (e) => {
    e.preventDefault();
    let updatedExpenseData = {
      ...expenseData,
      category:
        expenseData.category === "other"
          ? customCategory
          : expenseData.category,
    };

    setformErrors(validateFormData(updatedExpenseData));
    let fdataLength = Object.keys(validateFormData(updatedExpenseData)).length;

    if (fdataLength === 0) {
      try {
        let { data } = await axios.put(
          `https://expense-tracker-backend-ufdt.onrender.com/api/updateexpense/${id}`,
          updatedExpenseData
        );
        console.log(data);
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigateToExpenses("/category");
        }, 5000);
        setExpenseData({
          category: "",
          amount: "",
          date: new Date(),
          description: "",
        });
        setCustomCategory("");
        setStartDate(new Date());
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="expense-div">
        <h1>Update Expense Details</h1>
        <form className="expense-form">
          <label>Category:</label>

          <Select
            value={
              options.find(
                (option) => option.value === expenseData.category
              ) || {
                value: expenseData.category,
                label: expenseData.category,
              }
            }
            className="select"
            options={options}
            onChange={getSelectOption}
            name="category"
            key={options.value}
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
              onChange={changeExpense}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.amount}
          </small>

          <div className="date-divs">
            <label>Date</label>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={handleDateChange}
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
            onChange={changeExpense}
          ></textarea>
          <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
            {formErrors.description}
          </small>

          <button type="submit" onClick={updateExpense}>
            Update Expense
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateCategory;
