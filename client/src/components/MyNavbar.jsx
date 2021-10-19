import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../redux/user/user.actions";
//
import Logo from "./Logo";
//
import "./MyNavbar.scss";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="my-navbar navbar navbar-expand-md">
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
        >
          <span className="navbar-toggler-icon custom-toggler"></span>
        </button>
        <div className={`navbar-collapse ${collapsed && "collapse"}`} id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-end w-100" onClick={() => setCollapsed(true)}>
            {currentUser?.username === "Admin" && <li className="nav-link" onClick={()=>history.push('/manage')}>Manage</li>}

            {currentUser && (
              <div className="d-md-flex ml-md-auto">
                <li
                  className="nav-link"
                  onClick={() => {
                    dispatch(onLogout());
                  }}
                >
                  Logout
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
