import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import UserRoutes from "./routes/user.route"
const sequelize = require("./util/db/database_config");
const UserModel = require("./model/User");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/user", UserRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    sequelize.sync().then(() => {
        console.log("Database is connected");
    });
});

