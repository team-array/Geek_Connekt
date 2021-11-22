require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const chalk = require("chalk");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqk4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((result) => {
        console.log(chalk.green("Connected to MongoDB"));
        app.listen(process.env.PORT || 8000, (e) => {
            if (e) {
                console.log(e);
            } else {
                console.log(
                    chalk.green(`CONNECTION TO EXPRESS ESTABLISHED at port`)
                );
            }
        });
    })
    .catch((err) => console.log(err));
