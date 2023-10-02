// importing modules
const express = require("express");
const db = require("../models");

// Assigning db.users to User variable
const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (username) {
      return res.json(409).send("username already taken");
    }

    const checkEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkEmail) {
      return res.json(409).send("Authentication Failed");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// exporting module
module.exports = {
  saveUser,
};
