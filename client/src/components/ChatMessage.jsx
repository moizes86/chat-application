import React from 'react';
import "./ChatMessage.scss";

export default function ChatMessage({content, user, time}) {
    return (
      <div className="chat-msg-container my-2 p-2">
        <p className="msg-details">
            Moshe 20:00
          {user} {time}
        </p>
        <p className="msg-content">
            {content}
            Chat Message
        </p>
      </div>
    );
}
