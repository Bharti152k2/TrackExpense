const Expenses = require("../model/addExpense.model");
const { default: mongoose } = require("mongoose");

//^ DELETE EXISTING EXPENSE API
let deleteExpense = async (req, res, next) => {
  try {
    let { pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid ID format" });
    }

    let expense = Expenses.findById(pid);

    if (!expense) {
      return res
        .status(404)
        .json({ error: true, message: "Expense not found" });
    }
    let deletedExpense = await Expenses.deleteOne({ _id: pid });

    return res.status(200).json({
      error: false,
      message: "Expense deleted",
      data: deletedExpense,
    });
  } catch (error) {
    next(error);
  }
};
//^ GET UPDATE EXPENSE API = TO GET UPDATED EXPESNE DATA

let updateExpense = async (req, res, next) => {
  try {
    let { pid } = req.params;
    let { category, date, amount, description } = req.body;

    let expense = await Expenses.findById(pid);
    if (!expense) {
      return res.status(401).json({
        error: true,
        message: "No Expense found with given id",
      });
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
          let updatedExpense = await Expenses.findByIdAndUpdate(
            pid,
            { $set: { category, date, amount, description } },
            { new: true, runValidators: true }
          );

          res.status(201).json({
            error: false,
            message: "Expense Updated Successfully",
            data: updatedExpense,
          });
        } else {
          return res.status(201).json({ message: "Enter correct details" });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  deleteExpense,
  updateExpense,
};
