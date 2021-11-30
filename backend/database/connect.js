const mongoose = require("mongoose");
const chalk = require("chalk");
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqk4t.mongodb.net/geekConnekt?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log(chalk.green("Connected to MongoDB"));
});
db.on("reconnect", function () {
    console.log("Reconnected to MongoDB");
});
db.on("disconnect", function () {
    console.log("Disconnected to MongoDB");
    mongoose.connect(mongoUrl);
});
