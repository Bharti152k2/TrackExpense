const express = require("express");

const routes = require("./routes/user.routes.js");

const cors = require("cors");

const connectDb = require("./database/connectdb.js");

let app = express();

app.use(express.json());

app.use(cors());

app.use("/api", routes);

//* creating port for servers

let startServer = async () => {
  try {
    await connectDb();
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
