const {io} = require("../bin/www");


io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("message", "Socket io message");
});