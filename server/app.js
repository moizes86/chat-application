const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { methods: ["GET", "POST"], origin: ["http://localhost:3000"] },
});
var path = require("path");
const port = process.env.PORT || 3100;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const { userJoin, userLeave, getCurrentUser, getRoomUsers } = require("./utils/users");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

dotenv.config();
mongoose
  .connect(process.env.DB_ACCESS, () =>
    console.log(mongoose.connection.readyState === 1 ? "MongoDB Connected" : "Error connecting to database")
  )
  .catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`Server connected. Listening at http://localhost:${port}`);
});

//
//
//
//

io.on("connection", (socket) => {
  const botName = "Admin";
  socket.on("joinRoom", ({ currentUser: { email, username }, room }) => {
    console.log(socket.id);

    const user = userJoin(socket.id, email, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", { user: botName, text: `Welcome to room ${user.room}` });

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", { user: botName, text: `${user.username} has joined the chat` });

    // Send users and room info
    io.to(user.room).emit("roomUsers", getRoomUsers(user.room));
  });

  // Listen for chatMessage
  socket.on("chatMessage", ({room,currentUser, message}) => {
    io.to(room).emit("message", { user: currentUser.username, text: message });
  });

  // Runs when client disconnects
  socket.on("leaveRoom", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: botName, text: `${user.username} has left the room` });

      // Send users and room info
      io.to(user.room).emit("roomUsers", getRoomUsers(user.room));
    }
  });
});
