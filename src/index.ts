import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
const sequelize = require("./util/db/database_config");
const UserModel = require("./model/User");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    sequelize.sync().then(() => {
        console.log("Database is connected");
    });
});

app.use("/user", require("./routes/user.route"));