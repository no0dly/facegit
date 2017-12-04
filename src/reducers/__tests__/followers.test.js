import followers from "../followers";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../../actions/followers";

describe("Followers reducer", () => {
  const fetchReq = fetchFollowersRequest.toString();
  const fetchSuc = fetchFollowersSuccess.toString();
  const fetchFail = fetchFollowersFailure.toString();

  describe("isFetching field", () => {
    it("Should return true on fetchFollowersRequest", () => {
      const nextState = followers(
        {
          isFetching: false
        },
        { type: fetchReq }
      );
      expect(nextState.isFetching).toEqual(true);
    });
    it("Should return false on fetchFollowersSuccess", () => {
      const nextState = followers(
        {
          isFetching: true
        },
        { type: fetchSuc }
      );
      expect(nextState.isFetching).toEqual(false);
    });
    it("Should return false on fetchFollowersFailure", () => {
      const nextState = followers(
        {
          isFetching: true
        },
        { type: fetchFail }
      );
      expect(nextState.isFetching).toEqual(false);
    });
  });
  describe("isFetched field", () => {
    it("Should return false on fetchFollowersRequest", () => {
      const nextState = followers(
        {
          isFetched: true
        },
        { type: fetchReq }
      );
      expect(nextState.isFetched).toEqual(false);
    });
    it("Should return true on fetchFollowersSuccess", () => {
      const nextState = followers(
        {
          isFetched: false
        },
        { type: fetchSuc }
      );
      expect(nextState.isFetched).toEqual(true);
    });
    it("Should return true on fetchFollowersFailure", () => {
      const nextState = followers(
        {
          isFetched: false
        },
        { type: fetchFail }
      );
      expect(nextState.isFetched).toEqual(true);
    });
  });
  describe("data field", () => {
    it("Should clean data on fetchFollowersRequest", () => {
      const nextState = followers({}, { type: fetchReq });
      expect(nextState.data).toEqual([]);
    });
    it("Should return error on fetchFollowersSuccess", () => {
      const data = [1, 2, 3, 4];
      const nextState = followers(
        {},
        {
          type: fetchSuc,
          payload: data
        }
      );
      expect(nextState.data).toEqual(data);
    });
  });
  describe("error field", () => {
    it("Should clean error field on fetchFollowersRequest", () => {
      const nextState = followers({}, { type: fetchReq });
      expect(nextState.error).toEqual(null);
    });
    it("Should clean error field on fetchFollowersSuccess", () => {
      const nextState = followers({}, { type: fetchSuc });
      expect(nextState.error).toEqual(null);
    });
    it("Should return false on fetchFollowersFailure", () => {
      const error = new Error();
      const nextState = followers(
        {
          isFetching: true
        },
        {
          type: fetchFail,
          payload: error
        }
      );
      expect(nextState.error).toEqual(error);
    });
  });
});
