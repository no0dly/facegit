import React from "react";
import { shallow } from "enzyme";

import { Followers } from "../Followers/Followers";

import Spinner from "react-svg-spinner";

describe("Followers component", () => {
  const wrapper = shallow(<Followers fetchFollowersRequest={jest.fn()} />);
  it("should exist", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("should have componentDidMount method", () => {
    expect(wrapper.instance().componentDidMount).toBeDefined();
  });
  it("should have show spinner when isFetching === true", () => {
    wrapper.setProps({ isFetching: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
