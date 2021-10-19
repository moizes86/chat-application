import React from "react";
import { useHistory } from "react-router";
import "./Logo.scss";

function Logo() {
  const history = useHistory();
  return (
    <div className="logo" onClick={() => history.push("/")}>
      <i className="bi bi-chat p-1"></i>
      <span className="">Chatee</span>
    </div>
  );
}

export default Logo;
