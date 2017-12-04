import { call, put, select } from "redux-saga/effects";
import request from "../request";
import { getIsNetworkErrorPresent } from "../../reducers/network";
import { clearNetworkErrors, networkError } from "../../actions/network";
import { logout } from "../../actions/auth";

describe("request saga", () => {
  describe("true branch", () => {
    const fn = () => {};
    const args = "blob";
    const saga = request(fn, args);
    it("Should do call(fn, args)", () => {
      expect(saga.next().value).toEqual(call(fn, args));
    });
    it("Should do select getIsNetworkErrorPresent", () => {
      expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
    });
    it("Should do put put(clearNetworkErrors())", () => {
      expect(saga.next(true).value).toEqual(put(clearNetworkErrors()));
    });
  });
  describe("in case error", () => {
    const fn = () => {};
    const args = "blob";
    const error = {
      response: {
        data: {
          error: "blaBla",
          message: "blublu",
          status: "401"
        }
      }
    };
    const saga = request(fn, args);

    saga.next();
    it("Should dispatch networkError", () => {
      expect(saga.throw(new Error()).value).toEqual(
        put(networkError(new Error()))
      );
    });
    // it("Should dispatch logout in case 401 status", () => {
    //   expect(saga.next().value).toEqual(put(logout()));
    // });
  });
});
