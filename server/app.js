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
const Room = require("./models/room.model");
const Message = require("./models/message.model");
// const { socketHandler } = require("./utils/socketHandler");

const { userJoin, userLeave, getRoomUsers, getPreviousMessages } = require("./utils/users");

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

io.on("connect", (socket) => {
  // Get Rooms List
  socket.on("get-rooms", async () => {
    const rooms = await Room.find();
    socket.emit("rooms-list", rooms);
  });

  const botName = "Admin";

  // ** ON JOIN ROOM **
  socket.on("join-room",  async ({ currentUser: { email, username }, room }) => {
    const user = userJoin(socket.id, email, username, room);
    const previousMessages = await getPreviousMessages(room);

    socket.join(user.room);

    // Send room's previous messages
    socket.emit("previous-messages", previousMessages);
    
    // Welcome current user
    socket.emit("message", { user: botName, text: `Welcome to room ${user.room}`, botMessage: true });

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", { user: botName, text: `${user.username} has joined the chat`, botMessage: true });

    // Send users and room info
    io.to(user.room).emit("room-users", getRoomUsers(user.room));

  });
  // ** END ON JOIN ROOM**

  // Listen for chatMessage
  socket.on("chatMessage", async({ room, currentUser, message }) => {
    io.to(room).emit("message", { user: currentUser, text: message });

    // Save message to db
    const docMessage = new Message({ text: message, user: currentUser, room});
    await docMessage.save((err, doc)=>{
      if(err) return console.log(err)
    })
  });

  // Runs when client disconnects
  socket.on("leave-room", () => {
    const user = userLeave(socket.id);

    if (user) {
      socket.leave(user.room);
      io.to(user.room).emit("message", {
        user: botName,
        text: `${user.username} has left the room`,
        botMessage: true,
      });

      // Send users and room info
      io.to(user.room).emit("room-users", getRoomUsers(user.room));
    }
  });
});

// const onConnection = (socket) => {
//   socketHandler(io, socket);
// };

// io.on("connect", onConnection);
