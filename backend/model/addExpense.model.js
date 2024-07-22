const { Schema, model } = require("mongoose");

let expenseSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is mandatory"],
      minlength: [4, "Category should contain minimum 4 characters"],
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is mandatory"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("expenses", expenseSchema);
