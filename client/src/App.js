import React from 'react';
//
import { useSelector } from 'react-redux';
//
import { Route, Redirect } from "react-router";
// Components
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccout";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
//
import './App.scss';
import ChatContainer from './components/ChatContainer';


function App({children}) {
  const {currentUser} = useSelector(state=>state.user);
  
  return (
    <div className="App container">
      <Route exact path={["/", "/signup"]}>
        {currentUser ? <Redirect to="/chat" /> : <Signup />}
      </Route>
      <Route path="/verify-account/:email">
        <VerifyAccount />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/chat">
        <ChatContainer />
      </Route>
    </div>
  );
}

export default App;
