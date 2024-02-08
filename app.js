require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/database");

const userRouter = require("./routes/userRouter");

const bodyParser = require("body-parser");
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// app.get("/api", (req, res) => {
//   db.query("SELECT * FROM registration", (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });
app.use("/", userRouter);

app.listen(process.env.APP_PORT, (err) => {
  if (err) throw err;
  console.log("Server is running on PORT : ", process.env.APP_PORT);
});
