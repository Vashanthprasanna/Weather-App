const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const weather = require("./db/models/schema.cjs");
require("dotenv").config();
const app = express();

mongoose
  .connect(
    process.env.DB_URI
  )
  .then(() => app.listen(3000))
  .then(() => console.log("DB Connected..."))
  .then(() => console.log("Server running on port 3000"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  weather
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.post("/", (req, res) => {
  const city = req.body.city;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`
  )
    .then((result) => {
      if (result.ok === true) {
        return result.json();
      } else {
        return res.status(500).json({ err: true });
      }
    })
    .then((respond) => {
      res.json(respond);
    })
    .then(() => {
      weather({ city: city })
        .save()
        .then(() => console.log("Data saved Successfully!"));
    })
    .catch((err) => console.log(err));
});

app.delete("/", (req, res) => {
  weather
    .deleteMany({})
    .then(() => {
      console.log("Data deleted successfully...");
      res.json();
    })
    .catch((err) => res.status(500).json(err));
});
