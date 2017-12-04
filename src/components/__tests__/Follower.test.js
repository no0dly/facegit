import React from "react";
import { mount } from "enzyme";

import Follower from "../Follower";

import { StaticRouter } from "react-router-dom";

describe("Follower component", () => {
  const context = {};
  const wrapper = mount(
    <StaticRouter context={context}>
      <Follower login="test" />
    </StaticRouter>
  );
  it("Should have image", () => {
    expect(wrapper.find("img.image")).toHaveLength(1);
  });
  it("Should have login prop", () => {
    expect(wrapper.find(Follower).prop("login")).toEqual("test");
  });
});
