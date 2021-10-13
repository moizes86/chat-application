const express = require("express");
const app = express();
var path = require("path");
const port = process.env.PORT || "3100";
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

dotenv.config();
mongoose
  .connect(process.env.DB_ACCESS, () =>
    console.log(mongoose.connection.readyState === 1 ? "MongoDB Connected": 'Error connecting to database')
  )
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server connected. Listening at http://localhost:${port}`);
});
