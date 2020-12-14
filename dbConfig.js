const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
