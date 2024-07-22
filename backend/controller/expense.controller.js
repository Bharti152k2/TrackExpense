const Expenses = require("../model/addExpense.model");

//^ ADDEXPENSE API : TO POST THE EXPENSE DATA

let addExpense = async (req, res) => {
  let { category, date, amount, description } = req.body;

  //!  validating before send the data

  //* for empty fields
  if (!category || !date || !amount || !description) {
    res.send({ error: false, message: "All fields are mandatory" });
  }

  //* for filled fields
  if (category && date && amount && description) {
    //^ checking for existing expense
    let existingExpense = await Expenses.findOne({
      $and: [{ category }, { date }, { amount }, { description }],
    });

    if (existingExpense) {
      res.json({ error: false, message: "You already added this" });
    }

    //^ validation for new user
    if (!existingExpense) {
      let charReg = /^[a-zA-Z]+$/g;
      let amountReg = /^[\d.,]+|[\d.,]+$/;
      if (charReg.test(category && description) && amountReg.test(amount)) {
        let addExpenseData = await Expenses.create({
          category,
          date,
          amount,
          description,
        });
        res.status(201).json({
          error: false,
          message: "Expense added succesfully",
          data: addExpenseData,
        });
      } else {
        return res
          .status(201)
          .json({ error: true, message: "Enter correct details" });
      }
    }
  }
};

//^ GET EXPENSE API = TO GET THE EXPESNE DATA
let getExpense = async (req, res, next) => {
  try {
    let expenses = await Expenses.find();
    return res.status(200).json({
      error: false,
      message: "Data fetched succesfully ",
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};
//^ GET EXPENSE API = TO GET THE EXPESNE DATA
let getOneExpense = async (req, res, next) => {
  try {
    let { pid } = req.params;
    let expense = await Expenses.findById(pid);
    if (!expense) {
      return res
        .status(404)
        .json({ error: true, message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
};
//^ GET SINGLE EXPENSE API = TO GET SINGLE EXPESNE DATA

let getFilteredExpense = async (req, res, next) => {
  try {
    let { category, amount, date, sort, fields } = req.query;

    let queryObject = {};

    if (category) {
      queryObject.category = category;
    }
    if (amount) {
      queryObject.amount = amount;
    }
    if (date) {
      queryObject.date = date;
    }
    if (fields) {
      let selectedFields = fields.split(",").join(" ") + "_id";
      fields = selectedFields;
    }
    let expenses = await Expenses.find(queryObject).select(fields);

    if (sort) {
      expenses = expenses.sort(sort);
    }
    expenses = await expenses;

    return res.status(200).json({
      error: false,
      message: "Data fetched succesfully ",
      data: expenses,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  addExpense,
  getExpense,
  getOneExpense,
  getFilteredExpense,
};
