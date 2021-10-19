import React, { useEffect } from "react";
//
import { useDispatch, useSelector } from "react-redux";
//
import { Route, Redirect } from "react-router";
// Components
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccout";
import Login from "./pages/Login";
import JoinChat from "./pages/JoinChat";
import ChatContainer from "./components/ChatContainer";
import PrivateRoute from "./PrivateRoute";
//
import "./App.scss";


function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {}, [dispatch, currentUser]);

  return (
    <div className="App container">
      <Route exact path={["/", "/login"]}>
        {currentUser ? <Redirect to="/chat" /> : <Login />}
      </Route>
      <Route path="/verify-account/:email">
        <VerifyAccount />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <PrivateRoute path="/chat" component={JoinChat} authed={currentUser !== null} />

      <PrivateRoute path="/chat/room/:room" component={ChatContainer} authed={currentUser !== null} />
    </div>
  );
}

export default App;
