const express = require('express');
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const logger = require('morgan');
const {Server} = require("socket.io");
const io = new Server(expressServer);

app.get("/", function (req, res, next) {
   res.sendFile(__dirname + "/view/index.html");
});

io.on("connection", (socket)=>{
   console.log("connected");
   socket.on("chat", (data)=>{
      io.emit("chatTransfer", data);
   });
   socket.on("disconnect", ()=>{
      console.log("disconnect")
   })
});

expressServer.listen(5000, function () {
   console.log("server ok");
});