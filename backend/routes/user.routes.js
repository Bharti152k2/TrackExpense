const express = require("express");
const {
  signUp,
  login,
  userData,
  logout,
} = require("../controller/user.controller");
const {
  addExpense,
  getExpense,
  getOneExpense,
  getFilteredExpense,
} = require("../controller/expense.controller");
const {
  deleteExpense,
  updateExpense,
} = require("../controller/manageExpense.controller");
const { getSpendings } = require("../controller/spending.controller");

let router = express.Router();
router.post("/data/signup", signUp);
router.post("/data/login", login);
router.get("/userdata", userData);
// router.post("/logout/:userId", logout);
router.post("/addexpense", addExpense);
router.get("/getexpense", getExpense);
router.get("/getoneexpense/:pid", getOneExpense);
router.get("/getfilteredexpense", getFilteredExpense);
router.delete("/deleteexpense/:pid", deleteExpense);
router.put("/updateexpense/:pid", updateExpense);
router.get("/spendings", getSpendings);

module.exports = router;
