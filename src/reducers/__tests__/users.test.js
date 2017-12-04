import users from "../users";
import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure
} from "../../actions/users";

describe("tests for users reducer", () => {
  const fetchRequest = fetchUserDataRequest.toString();
  const fetchSuccess = fetchUserDataSuccess.toString();
  const fetchFailure = fetchUserDataFailure.toString();

  describe("isFetching field", () => {
    it("action fetchUserDataRequest should change isFetching to true", () => {
      const newState = users({}, { type: fetchRequest });
      expect(newState.isFetching).toEqual(true);
    });
    it("action fetchUserDataSuccess should change isFetching to false", () => {
      const newState = users(
        {
          isFetching: true
        },
        { type: fetchSuccess }
      );
      expect(newState.isFetching).toEqual(false);
    });
    it("action fetchUserDataFailure should change isFetching to false", () => {
      const newState = users(
        {
          isFetching: true
        },
        {
          type: fetchFailure,
          payload: new Error()
        }
      );
      expect(newState.isFetching).toEqual(false);
    });
  });
  describe("isFetched field", () => {
    it("action fetchUserDataRequest should change isFetched to false", () => {
      const newState = users(
        {
          isFetched: true
        },
        { type: fetchRequest }
      );
      expect(newState.isFetched).toEqual(false);
    });
    it("action fetchUserDataSuccess should change isFetched to true", () => {
      const newState = users(
        {
          isFetching: false
        },
        { type: fetchSuccess }
      );
      expect(newState.isFetched).toEqual(true);
    });
    it("action fetchUserDataFailure should change isFetched to true", () => {
      const newState = users(
        {
          isFetching: false
        },
        {
          type: fetchFailure,
          payload: new Error()
        }
      );
      expect(newState.isFetched).toEqual(true);
    });
  });
  describe("data field", () => {
    it("clear data on fetchUserDataRequest", () => {
      const newState = users(
        {
          data: {
            someData: "bla bla"
          }
        },
        { type: fetchRequest }
      );
      expect(newState.data).toEqual({});
    });

    it("fills with data on fetchUserDataSuccess", () => {
      const data = {
        someData: "bla bla"
      };
      const newState = users(
        {},
        {
          type: fetchSuccess,
          payload: data
        }
      );
      expect(newState.data).toEqual(data);
    });
  });
  describe("error field", () => {
    it("clear data on fetchUserDataRequest", () => {
      const newState = users(
        {
          error: "some error"
        },
        { type: fetchRequest }
      );
      expect(newState.error).toEqual(null);
    });
    it("clear data on fetchUserDataSuccess", () => {
      const newState = users(
        {
          error: "some error"
        },
        { type: fetchSuccess }
      );
      expect(newState.error).toEqual(null);
    });

    it("fills with error description on fetchUserDataSuccess", () => {
      const error = new Error();
      const newState = users(
        {},
        {
          type: fetchFailure,
          payload: error
        }
      );
      expect(newState.error).toEqual(error);
    });
  });
});
