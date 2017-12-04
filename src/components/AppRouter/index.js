import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthPage from "../AuthPage";
import UserPage from "../UserPage";
import PrivateRoute from "../PrivateRoute";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" exact={true} component={AuthPage} />
        <PrivateRoute path="/user/:name" component={UserPage} />
        <Redirect to="/user/me" />
      </Switch>
    );
  }
}

export default AppRouter;
