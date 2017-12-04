import auth from "../auth";
import { authorize, logout } from "../../actions/auth";

describe("auth reducer", () => {
  describe("token field", () => {
    it("authorize action should set token from payload", () => {
      const data = "blaBla";
      const newState = auth(
        {},
        {
          type: authorize.toString(),
          payload: data
        }
      );
      expect(newState.token).toEqual(data);
    });
    it("logout action should clear token field", () => {
      const newState = auth(
        {
          token: "blaBla"
        },
        { type: logout.toString() }
      );
      expect(newState.token).toEqual(null);
    });
  });
  describe("isAuthorized field", () => {
    it("Should return true after autorize", () => {
      const newState = auth(
        {
          isAuthorized: false
        },
        { type: authorize.toString() }
      );
      expect(newState.isAuthorized).toEqual(true);
    });
    it("Should return false after logout", () => {
      const newState = auth(
        {
          isAuthorized: true
        },
        { type: logout.toString() }
      );
      expect(newState.isAuthorized).toEqual(false);
    });
  });
});
