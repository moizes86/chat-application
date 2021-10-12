import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

//Styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from "./App";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccout";
import Login from "./pages/Login";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route exact path="/">
            {false ? <Redirect to="/chat" /> : <Signup />}
          </Route>
          <Route path="/verify-account/:email">
            <VerifyAccount />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
