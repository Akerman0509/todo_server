require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./utils/connect");
const routes = require("./routes/index.route");

const app = express();
connectDB();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/v1", routes);
// app.get("/", (req, res) => {
//   res.send("Welcome to the Task Manager API");
// });


app.listen(process.env.PORT, () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
  });
  

