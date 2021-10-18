import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ path, component: Component, authed, ...rest }) {
  return (
    <Route
    exact path={path}
      {...rest}
      render={(props) => (authed === true ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
