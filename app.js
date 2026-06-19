const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config("./.env");
const pool = require("./db");
const app = express();
app.use(cors());
app.use(express.json());




app.use('/api/v1', require('./router'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});

module.exports = app;
