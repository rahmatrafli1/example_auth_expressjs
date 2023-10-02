// importing module
const { Sequelize, DataTypes } = require("sequelize");

// Database Connection
const sequelize = new Sequelize(
  `postgres://rahmat:rahmat@localhost:5432/discover`,
  { dialect: "postgres" }
);

// checking database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// connecting to model
db.users = require("./userModel")(sequelize, DataTypes);

// exporting to module
module.exports = db;
