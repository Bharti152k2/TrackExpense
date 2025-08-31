const express = require("express");

const routes = require("./routes/user.routes.js");

const cors = require("cors");

const connectDb = require("./database/connectdb.js");

let app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://expensesmanagerui.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/api", routes);

//* creating port for servers
const PORT = process.env.PORT || 3000;
let startServer = async () => {
  try {
    await connectDb();
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
