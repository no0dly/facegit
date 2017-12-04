import React from "react";
import { shallow } from "enzyme";

import AppRouter from "../AppRouter";
import PrivateRoute from "../PrivateRoute";
import AuthPage from "../AuthPage";
import UserPage from "../UserPage";
import { Switch, Route, Redirect } from "react-router-dom";

describe("AppRouter tests", () => {
  const wrapper = shallow(<AppRouter />);

  it("Does Switch element exist", () => {
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
  it("Does PrivateRoute exist", () => {
    expect(
      wrapper.contains(<PrivateRoute path="/user/:name" component={UserPage} />)
    ).toBeTruthy();
  });
  it("Does Login Route exist", () => {
    expect(
      wrapper.contains(
        <Route path="/login" exact={true} component={AuthPage} />
      )
    ).toBeTruthy();
  });
  it("Does Redirect to /user/userName exist", () => {
    expect(wrapper.contains(<Redirect to={"/user/me"} />)).toBeTruthy();
  });
});
