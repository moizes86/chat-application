import React from "react";
import "./ChatContainer.scss";
import ChatMessage from "./ChatMessage";

function ChatContainer() {
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
        <button className="">Leave Room</button>
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
              Room Name
            </h5>
            <p>Something Crazy</p>
          </div>
          <div className="users-in-room ">
            <h5>
              <i className="bi bi-people"></i> Users
            </h5>

            <ul>
              <li>User</li>
              <li>User</li>
              <li>User</li>
              <li>User</li>
              <li>User</li>
              <li>User</li>
            </ul>
          </div>
        </div>
        <div className="chat">
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
        </div>
      </div>

      {/* ****** */}
      {/* Bottom */}
      {/* ****** */}
      <div className="chat-bottom">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">
              SEND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
