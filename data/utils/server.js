const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ratingRoutes = require("./routes/ratings");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(ratingRoutes);

app.get("/", (req, res) => {
  res.json({message: "Ratings Web Server Working!"});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// const db = require("./models");
// db.sequelize.sync();

//app.listen(4000);
