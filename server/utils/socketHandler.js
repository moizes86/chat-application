const Room = require("../models/room.model");

let users = [];

const socketHandler = (io, socket) => {
  const getRooms = async () => {
    const rooms = await Room.find();
    socket.emit("rooms-list", rooms);
  };

  const getRoomUsers = (room) => {
    return users.filter((user) => user.room === room);
  };

  const joinRoom = ({ room, currentUser }) => {
    console.log("join room: ", currentUser.username);
    users.push({ room, email: currentUser.email, username: currentUser.username, id: socket.id });
    socket.join(room);
    socket.broadcast
      .to(room)
      .emit("message", { user: "Admin", text: `${currentUser.username} has joined the room`, botMessage: true });
    io.to(room).emit("room-users", getRoomUsers(room));
  };

  const leaveRoom = (email, username, room) => {
    console.log("leave room: ", email);
    socket.leave(room);
    const index = users.findIndex((user) => user.email === email);
    users.splice(index, 1);
    io.to(room).emit("message", { user: "Admin", text: `${username} has left the room`, botMessage: true });

    io.to(room).emit("room-users", users);
  };

  io.on("connect", () => {
    console.log("New Connection: ", socket.id);
  });
  socket.on("join-room", joinRoom);
  socket.on("get-rooms", getRooms);
  socket.on("leave-room", leaveRoom);
};

module.exports = { socketHandler };
