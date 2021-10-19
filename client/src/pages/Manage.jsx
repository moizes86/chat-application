import React, { useState, useEffect } from "react";
//
import { useSelector, useDispatch } from "react-redux";
import { onGetUsers } from "../redux/manage/manage.actions";
import { asyncOnGetUsers } from "../redux/manage/manage.utils";
//

export default function Manage() {
  const dispatch = useDispatch();
  const { fetchError, users } = useSelector((state) => state.manage);

  // Get users
  useEffect(() => {
    dispatch(asyncOnGetUsers());
  },[dispatch]);
  return <div className="manage"></div>;
}

// get and delete users and all their messages
// add rooms, delete rooms
