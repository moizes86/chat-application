import React from "react";
import "./ChatMessage.scss";

export default function ChatMessage({ user, text, currentUser, botMessage }) {
  const myMessage = currentUser.email === user.email ? "my-message" : "";

  return (
    <div className={`chat-msg-container my-2 p-2 ${myMessage} ${botMessage ? "bot-message" : ""}`}>
      <p className="msg-details">{user.username}</p>
      <p className="msg-content">{text}</p>
    </div>
  );
}
