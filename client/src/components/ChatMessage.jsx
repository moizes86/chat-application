import React from "react";
import "./ChatMessage.scss";

export default function ChatMessage({ user, text }) {
  return (
    <div className="chat-msg-container my-2 p-2">
      <p className="msg-details">
        {user}
      </p>
      <p className="msg-content">{text}</p>
    </div>
  );
}
