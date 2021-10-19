import React from "react";
//
import { useHistory, useLocation } from "react-router";
//
import "./UsersTable.scss";

export default function UsersTable({ users }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="users-table mt-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Member Since</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr
              key={user.email}
              className="clickable-user-row"
              onClick={() => {
                history.push(`${location.pathname}/${user.email}`);
              }}
            >
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.date.slice(0, user.date.indexOf("T"))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
