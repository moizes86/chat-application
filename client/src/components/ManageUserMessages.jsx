import React from "react";

export default function ManageUserMessages({ messages }) {
  return (
    <div className="manage-user-messages">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Message</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
      {messages.map((message) => (
            <tr>
              <td>{message.text}</td>
              <td>{message.room}</td>
              <td>{message.date}</td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
