import React from "react";

import { UserPage } from "../UserPage/UserPage";
import Followers from "../Followers/Followers";
import Spinner from "react-svg-spinner";
import { shallow } from "enzyme";

describe("UserPage", () => {
  const wrapper = shallow(
    <UserPage
      match={{
        params: {
          name: "test"
        }
      }}
      fetchUserDataRequest={jest.fn()}
    />
  );
  it("UserPage exists", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Is there componentDidMount", () => {
    expect(wrapper.instance().componentDidMount).toBeDefined();
  });
  it("Should show spinner when user data is fetching", () => {
    expect(wrapper.setProps({ isFetching: true }).find(Spinner)).toHaveLength(
      1
    );
  });
  it("Should show error with no username", () => {
    expect(
      wrapper.setProps({ isFetching: false, isFetched: true }).find("p.error")
    ).toHaveLength(1);
  });
  it("Should should have Followers component with login prop", () => {
    wrapper.setProps({
      isFetching: false,
      isFetched: true,
      userNickname: "test",
      userName: "some name"
    });
    expect(wrapper.find(Followers).prop("login")).toEqual("test");
  });
});
