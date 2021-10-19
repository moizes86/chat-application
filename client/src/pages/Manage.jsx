import React from "react";
//
import { Link, useLocation } from "react-router-dom";

export default function Manage() {
  const location = useLocation();

  return (
    <div className="manage">
      <h4 className="mb-4">Manager</h4>
      <p>
        <Link to={`${location.pathname}/users`}>Users</Link>
      </p>
      <p>
        <Link to={`${location.pathname}/messages`}>Messages</Link>
      </p>
      <p>
        <Link to={`${location.pathname}/rooms`}>Rooms</Link>
      </p>
    </div>
  );
}

// get and delete users and all their messages
// add rooms, delete rooms
