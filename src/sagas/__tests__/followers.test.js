import { fetchFollowersRequestSaga } from "../followers";
import { getUserFollowers } from "../../api";
import {
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../../actions/followers";

import { call, put } from "redux-saga/effects";

describe("Followers saga", () => {
  const action = {
    payload: "login"
  };
  const data = {
    nick: "name",
    age: 10
  };
  const saga = fetchFollowersRequestSaga(action);
  it("Should make call method with correct parameters", () => {
    expect(saga.next().value).toEqual(call(getUserFollowers, "login"));
  });
  it("Should dispatch fetchFollowersSuccess action", () => {
    expect(saga.next(data).value).toEqual(
      put(fetchFollowersSuccess(data.data))
    );
  });
  it("Should dispatch fetchFollowersFailure on error", () => {
    const saga = fetchFollowersRequestSaga(action);
    const error = new Error();
    saga.next();
    expect(saga.throw(error).value).toEqual(put(fetchFollowersFailure(error)));
  });
});
