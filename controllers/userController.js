const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.users;

// signup
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: bcrypt.hash(password, 10),
    };
    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: User.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Detail are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, User.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);

        return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication Failed!");
      }
    } else {
      return res.status(401).send("Authentication Failed!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
