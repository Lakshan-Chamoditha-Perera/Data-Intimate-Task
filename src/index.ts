import express from "express";
import bodyParser from "body-parser";

const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});