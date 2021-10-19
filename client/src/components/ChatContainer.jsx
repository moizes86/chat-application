import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//
import { useDispatch, useSelector } from "react-redux";
import {
  onSetRoomUsers,
  onMessageRecieved,
  onClearMessages,
  onSetPreviousMessages,
} from "../redux/chat/chat.actions";
//
import ChatMessage from "./ChatMessage";
//
import "./ChatContainer.scss";
import Logo from "./Logo";
//
// import socket from "../DAL/socket";

function ChatContainer() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { room } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { messages, roomUsers, socket } = useSelector((state) => state.chat);

  useEffect(() => {
    // Get users in room
    socket.on("room-users", (roomUsers) => dispatch(onSetRoomUsers(roomUsers)));

    // Get previous messages
    socket.on("previous-messages", (messages) => {
      dispatch(onSetPreviousMessages(messages));
    });

    // Get messages in real time
    socket.on("message", (msg) => {
      dispatch(onMessageRecieved(msg));
    });

    return () => {
      socket.emit("leave-room");
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
        <div className="room-name">
          <p>
            <i className="bi bi-chat-dots-fill"></i>
            <i className="bi bi-chat-dots-fill "></i>
            {room}
          </p>
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
          <div className="users-in-room ">
            <h5>
              <i className="bi bi-people"></i> Users
            </h5>

            <ul>{roomUsers.length && roomUsers.map((user, i) => <li key={i}> {user.username}</li>)}</ul>
          </div>
        </div>
        <div className="chat">
          {messages.map((message, i) => (
            <ChatMessage
              key={`${i}-${message.text}`}
              index={i}
              currentUser={currentUser}
              text={message.text}
              user={message.user}
              botMessage={message.botMessage}
            />
          ))}
        </div>
      </div>

      {/* ****** */}
      {/* Bottom */}
      {/* ****** */}
      <div className="chat-bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message.length) {
              socket.emit("chatMessage", { room, currentUser, message });
              setMessage("");
            }
          }}
          className="w-100"
        >
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Say something..."
              value={message}
              onChange={handleChange}
            />{" "}
            <div className="input-group-append">
              <button className="input-group-text" id="basic-addon2">
                SEND
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatContainer;
