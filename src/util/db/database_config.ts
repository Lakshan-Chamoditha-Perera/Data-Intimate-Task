const Sequelize = require("sequelize");
import * as process from "process";

const sequelize = new Sequelize(
    "data_intimate_db",
    "root",
    "1234",
    {
        dialect: "mysql",
        host: "localhost",
        port: 3306,
    });

module.exports = sequelize;
