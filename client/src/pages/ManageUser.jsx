import React, { useEffect } from "react";
//
import { useParams } from "react-router";
//
import { useDispatch, useSelector } from "react-redux";
import { asyncOnGetUser } from "../redux/manage/manage.utils";
import MySpinner from "../components/MySpinner";
import ManageUserMessages from "../components/ManageUserMessages";

export default function ManageUser() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const { loading, user } = useSelector((state) => state.manage);

  useEffect(() => {
    dispatch(asyncOnGetUser(email));
  }, [dispatch, email]);

  return (
    <div className="manage-user">
      {loading && <MySpinner />}

      {user && (
        <>
          <div className="details">
            <h4>{user.details.username}</h4>
            <p>{user.details.email}</p>
            <p>Member Since {user.details.date.slice(0, user.details.date.indexOf("T"))}</p>
            <img src={user.details.profilePic} alt="profile-pic" />
          </div>

          <div className="messages mt-5">
            <h4>Messages</h4>
            <ManageUserMessages messages={user.messages} />
          </div>
        </>
      )}
    </div>
  );
}
