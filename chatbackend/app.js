require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
require("../backend/database/connect");
const chats = require("./model/chat");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use(bodyParser.json({ limit: "3mb", extended: true }));
const router = require("./router");
app.use(router);
const port = process.env.PORT || 8001;
const server = app.listen(port, (err) => {
  if (!err) {
    console.log("connected");
  }
});

const wss = new WebSocket.Server({
  server,
  verifyClient: async (info) => {
    console.log(info.req.headers);
    const token = info.req.headers["sec-websocket-protocol"];
    console.log(token);
    if (!token) {
      return false;
    } else {
      try {
        const verify = jwt.verify(token, process.env.secretkey);
        console.log(verify);
        if (verify) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.lo(error);
        console.log("error");
        return false;
      }
    }
  },
});

wss.on("connection", (ws, req, client) => {
  const token = req.headers["sec-websocket-protocol"];
  const user = require("./Controllers/auth")(token);
  console.log(client);
  console.log(user);
  ws.on("message", async (data) => {
    let msg = JSON.parse(data);
    console.log(msg);
    if (msg.msg == "get") {
      console.log(msg.username, user.username);
      try {

        const result = await chats.find({
            $or: [
              {
                $and : [{ user1: user.username }, { user2: msg.username }],
              },
              {
                $and : [{ user2: user.username }, { user1: msg.username }],
              },
            ],
        });
        console.log(result);
        ws.send(JSON.stringify(result));
      } catch (error) {
        console.log(error);
      }
      console.log("get");
    } else {
      console.log("post");
      console.log(msg);
      const result = chats({
        user1: user.username,
        user2: msg.username,
        sentby: user.username,
        message: msg.message,
      });
      await result.save();
      wss.clients.forEach(async (ws) => {
        // console.log(ws._protocol);
        const user1 = require("./controllers/auth")(ws._protocol);
        if (ws.readyState == WebSocket.OPEN && (user1.username==user.username || user1.username == msg.username)) {
          console.log("ws is ...",ws);
          const result = await chats.find({
              $or: [
                {
                  $and : [{ user1: user.username }, { user2: msg.username }],
                },
                {
                  $and : [{ user2: user.username }, { user1: msg.username }],
                },
              ],
          });
          console.log(result);
          ws.send(JSON.stringify(result));
        }
      });
    }
  });
});