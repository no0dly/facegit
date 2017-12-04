import React from "react";
import { shallow } from "enzyme";

import { AuthPage } from "../AuthPage/AuthPage";

import { Redirect } from "react-router-dom";

describe("AuthPage component", () => {
  const wrapper = shallow(<AuthPage />);

  it("Should have onChangeHandler", () => {
    expect(wrapper.instance().onChangeHandler).toBeDefined();
  });
  it("Should have onKeyDownHandler", () => {
    expect(wrapper.instance().onKeyDownHandler).toBeDefined();
  });
  it('Should have redirect to "/" if no token', () => {
    expect(
      wrapper.setProps({ token: "123" }).contains(<Redirect to="/" />)
    ).toBeTruthy();
  });
  it("Should show an error if any network errors appears", () => {
    expect(
      wrapper
        .setProps({ token: null, networkError: "some Error" })
        .find("p.error")
    ).toHaveLength(1);
  });
});
