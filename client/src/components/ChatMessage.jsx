import React, { useEffect, useRef } from "react";
//
import { useSelector } from "react-redux";
//
import "./ChatMessage.scss";

export default function ChatMessage({ index, user, text, currentUser, botMessage }) {
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
      className={`chat-msg-container my-2 p-2 ${myMessage} ${botMessage ? "bot-message" : ""}`}
      ref={lastMessage ? lastMessageRef : null}
    >
      <p className="msg-details">{user.username}</p>
      <p className="msg-content">{text}</p>
    </div>
  );
}
