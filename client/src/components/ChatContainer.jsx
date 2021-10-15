import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//
import { useDispatch, useSelector } from "react-redux";
import { onMessageRecieved, onClearMessages, onSetUsersInRoom } from "../redux/chat/chat.actions";
//
import ChatMessage from "./ChatMessage";
//
import "./ChatContainer.scss";
//
import { io } from "socket.io-client";

function ChatContainer() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { room } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { messages, usersInRoom } = useSelector((state) => state.chat);

  const socket = io("http://localhost:3100");

  useEffect(() => {
    socket.emit("joinRoom", { currentUser, room });

    socket.on("message", (msg) => {
      dispatch(onMessageRecieved(msg));
    });

    socket.on("roomUsers", (users) => {
      dispatch(onSetUsersInRoom(users));
    });

    return () => {
      socket.emit("leaveRoom", currentUser);
      socket.off();
      dispatch(onClearMessages());
    };
  }, []);

  const handleChange = ({ target: { value } }) => {
    return setMessage(value);
  };

  return (
    <div className="chat-container">
      {/* ****** */}
      {/* Header */}
      {/* ****** */}
      <div className="chat-header d-flex justify-content-between align-items-center">
        <div className="left-side">
          <i className="bi bi-chat p-1"></i>
          <span className="">Chatee</span>
        </div>
        <button className="" onClick={() => history.goBack()}>
          Leave Room
        </button>
      </div>

      {/* ****** */}
      {/* Center */}
      {/* ****** */}

      <div className="chat-main">
        <div className="side-bar">
          <div className="room-name">
            <h5>
              <i className="bi bi-chat-dots-fill"></i>
              <i className="bi bi-chat-dots-fill "></i>
              Room:
            </h5>
            <p>{room}</p>
          </div>
          <div className="users-in-room ">
            <h5>
              <i className="bi bi-people"></i> Users
            </h5>

            <ul>{usersInRoom.length && usersInRoom.map((user, i) => <li key={i}> {user}</li>)}</ul>
          </div>
        </div>
        <div className="chat">
          {messages.map((message, i) => (
            <ChatMessage key={`${i}-${message.text}`} text={message.text} user={message.user} />
          ))}
        </div>
      </div>

      {/* ****** */}
      {/* Bottom */}
      {/* ****** */}
      <div className="chat-bottom">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Say something..."
            value={message}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button
              className="input-group-text"
              id="basic-addon2"
              onClick={() => socket.emit("chatMessage", { room, currentUser, message })}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;