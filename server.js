// import packages
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

// settings port
const port = process.env.PORT || 5000;

// assignment variable app to express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// listen to server connection
app.listen(port, () => console.log(`Server is connect to ${port}`));
