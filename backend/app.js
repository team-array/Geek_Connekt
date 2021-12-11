require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const fileUpload = require("express-fileupload");
const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const socketio = require("socket.io");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.enable("trust proxy");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

require("./database/connect");

require("./redis/redis").connect();

const port = process.env.PORT || 8000;
const server = app.listen(port, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log(`CONNECTION TO EXPRESS ESTABLISHED at port: ${port}`);
    }
});

const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

let onlineUser = [];
app.set("socketio", io);
app.set("onlineUser", onlineUser);

const addNewUser = (userId, socketId) => {
    console.log("Adding new user");
    onlineUser = onlineUser.filter((user) => user.userId !== userId);
    onlineUser.push({ userId, socketId });
    app.set("onlineUser", onlineUser);
    console.log(onlineUser);
};

const removeUser = (userId, socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId != socketId);
    // app.set("onlineUser", onlineUser);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("New connection!");
    socket.on("newUser", (userId) => addNewUser(userId, socket.id));
    socket.on("disconnect", (socket) => {
        console.log("User disconnected");
        removeUser(null, socket.id);
    });
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(routes);
