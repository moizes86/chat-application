import React, { useEffect, useState } from "react";
//
import { useDispatch, useSelector } from "react-redux";
import { onSetRooms } from "../redux/chat/chat.actions";
import { onLogout } from "../redux/user/user.actions";
//
import { useHistory } from "react-router";
//
import "./JoinChat.scss";

export default function JoinChat() {
  const [selectedRoom, setSelectedRoom] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { rooms, socket } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!rooms.length) socket.emit("get-rooms");
    socket.on("rooms-list", (rooms) => {
      dispatch(onSetRooms(rooms));
    });

    return () => {
      socket.off();
    };
  }, [socket, dispatch, rooms.length]);

  return (
    <div className="join-chat custom-form">
      <h3>Join Chat</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group text-center">
          <select
            className="form-select"
            id="exampleFormControlSelect1"
            name="roomName"
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option hidden>Choose one</option>

            {rooms.map((room, i) => (
              <option key={`${room.name}-${i}`}>{room.name}</option>
            ))}
          </select>

          <div className="join-chat-bottom d-flex justify-content-between mt-3">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (selectedRoom) {
                  socket.emit("join-room", { room: selectedRoom, currentUser });
                  history.push(`/chat/room/${selectedRoom}`);
                }
              }}
            >
              Join Room
            </button>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                dispatch(onLogout());
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
