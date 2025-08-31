const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(
    "mongodb+srv://nidhi15sak_db_user:lrEM5ekc3JAjQtkz@cluster0.mrtenu8.mongodb.net/Expense_Manager"
  );
}
module.exports = connectDb;
