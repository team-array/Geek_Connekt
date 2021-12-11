require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
require("./database/connect");
const chats = require("./model/chat");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use(bodyParser.json({ limit: "3mb", extended: true }));
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
        console.log(error);
        console.log("error");
        return false;
      }
    }
  },
});

wss.on("connection", (ws, req, client) => {
  const token = req.headers["sec-websocket-protocol"];
  const user = require("./controllers/auth")(token);
  console.log(client);
  console.log(user);
  wss.clients.forEach((client) => {
    const user1 = require("./controllers/auth")(client._protocol);
    if (
      client.readyState == WebSocket.OPEN &&
      user.username !== user1.username
    ) {
      client.send(
        JSON.stringify({
          isOnline: true,
          username: user.username,
          type: "online",
        })
      );
    }
  });

  ws.on("close", () => {
    console.log("disconnected");
    wss.clients.forEach((client) => {
      console.log(user.username);
      client.send(
        JSON.stringify({
          isOnline: false,
          username: user.username,
          type: "online",
        })
      );
    });
  });
  ws.on("message", async (data) => {
    let msg = JSON.parse(data);
    console.log(msg);
    if (msg.msg === "userIsOnline") {
      let userOnline = false;
      wss.clients.forEach((client) => {
        console.log(msg.username, user.username);
        const user1 = require("./controllers/auth")(client._protocol);
        if (
          client.readyState == WebSocket.OPEN &&
          msg.username === user1.username
        ) {
          userOnline = true;
          console.log("userOnline ", user1.username);
        }
      });
      if (userOnline) {
        wss.clients.forEach((client) => {
          const user1 = require("./controllers/auth")(client._protocol);
          if (
            client.readyState == WebSocket.OPEN &&
            msg.username !== user1.username
          ) {
            client.send(
              JSON.stringify({
                isOnline: true,
                username: msg.username,
                type: "online",
              })
            );
          }
        });
      }
    }
    if (msg.msg == "get") {
      try {
        const result = await chats.find({
          $or: [
            {
              $and: [{ user1: user.username }, { user2: msg.username }],
            },
            {
              $and: [{ user2: user.username }, { user1: msg.username }],
            },
          ],
        });
        const update = await chats.updateMany(
          { seen: msg.username },
          { seen: "both" }
        );
        const update2 = await chats.updateMany(
          { seen: "none" },
          { seen: user.username }
        );
        console.log(result);
        ws.send(JSON.stringify({ type: "get", data: result }));
      } catch (error) {
        console.log(error);
      }
      console.log("get");
    }
    if (msg.msg == "post") {
      console.log("post");
      console.log(msg);
      const result = chats({
        user1: user.username,
        user2: msg.username,
        message: msg.message,
        seen: user.username,
      });
      await result.save();
      wss.clients.forEach(async (ws) => {
        // console.log(ws._protocol);
        const user1 = require("./controllers/auth")(ws._protocol);
        if (
          ws.readyState == WebSocket.OPEN &&
          (user1.username == user.username || user1.username == msg.username)
        ) {
          console.log("ws is ...", ws);
          const result = await chats.find({
            $or: [
              {
                $and: [{ user1: user.username }, { user2: msg.username }],
              },
              {
                $and: [{ user2: user.username }, { user1: msg.username }],
              },
            ],
          });
          console.log(result);
          ws.send(JSON.stringify({ type: "get", data: result }));
        }
      });
    }
  });
});
