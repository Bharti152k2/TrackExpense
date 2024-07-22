const Expenses = require("../model/addExpense.model");
//^ GET SUMMARYVIEW API = TO GET SUMMARYVIEW OF SPENDINGS

let getSpendings = async (req, res, next) => {
  try {
    let { period } = req.query;
    let startDate, endDate;
    switch (period) {
      case "daily":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        break;
      case "weekly":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "monthly":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(1);
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return res.status(400).json({ error: true, message: "Invalid period" });
    }

    let summaryData = await Expenses.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let totalSpent = summaryData.length > 0 ? summaryData[0].totalSpent : 0;

    let categorizedData = await Expenses.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          categorizedSpent: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: { categorizedSpent: -1 },
      },
    ]);

    let categorizedSpent =
      categorizedData.length > 0 ? categorizedData[0].categorizedSpent : 0;
    return res.status(200).json({
      error: false,
      message: `Total spending for ${period}`,
      data: { totalSpent, categorizedData, categorizedSpent },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSpendings };
