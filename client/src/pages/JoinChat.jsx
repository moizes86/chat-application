import React, { useEffect, useState } from "react";
//
import { io } from "socket.io-client";
//
import { useDispatch, useSelector } from "react-redux";
//
import { useHistory } from "react-router";
//
import "./JoinChat.scss";
import { onSetRooms,  } from "../redux/chat/chat.actions";

//

export default function JoinChat() {
  const [selectedRoom, setSelectedRoom] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { rooms, messages, socket } = useSelector((state) => state.chat);

  useEffect(() => {
    console.log("COMPONENT REND");
    if(!rooms.length) socket.emit("get-rooms");
    socket.on("rooms-list", (rooms) => {
      dispatch(onSetRooms(rooms));
    });
    
    return () => {
    };
  }, [socket, dispatch]);

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
          <button
            className="mt-2"
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
        </div>
      </form>
    </div>
  );
}
