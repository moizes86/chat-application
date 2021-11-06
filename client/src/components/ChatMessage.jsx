import React, { useEffect, useRef } from "react";
//
import { useSelector } from "react-redux";
//
import "./ChatMessage.scss";

export default function ChatMessage({ index, user, text, currentUser, time, botMessage }) {
  const lastMessageRef = useRef();

  // Determine whether that's the last message
  const { messages } = useSelector((state) => state.chat);
  const lastMessage = messages.length - 1 === index;

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  });
  const myMessage = currentUser.email === user.email ? "my-message" : "";

  return (
    <div
      className={`chat-msg-container my-2 p-2 ${myMessage} ${botMessage ? "bot-message" : "my-4"}`}
      ref={lastMessage ? lastMessageRef : null}
    >
      <div className="msg-details">
        <span className="username">{user.username}</span>
        {!botMessage && (
          <div className="date-and-time">
            <p className="date">{time.substr(0, 10)}</p>
            <p className="time">{time.substr(11, 5)}</p>
          </div>
        )}
      </div>
      <p className="msg-content mt-2">{text}</p>
    </div>
  );
}
