const Sequelize = require("sequelize");
import * as process from "process";

const sequelize = new Sequelize(
    "data_intimate_db",
    "root",
    "1234",
    {
        dialect: "mysql",
        host: "localhost",
    });

module.exports = sequelize;
