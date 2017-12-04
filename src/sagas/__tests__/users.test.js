import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  fetchTokenOwnerRequest
} from "../../actions/users";
import { call, put } from "redux-saga/effects";
import { fetchUserDataRequestSaga } from "../users";
import { getUserInformation, getTokenOwner } from "../../api";
import requestFlow from "../request";

describe("Saga users:", () => {
  describe("fetchUserDataRequest branch", () => {
    const action = {
      type: fetchUserDataRequest.toString(),
      payload: "test_login"
    };
    const user = {
      data: {
        login: "test",
        id: "1"
      }
    };
    const saga = fetchUserDataRequestSaga(action);
    it("Should call getUserInformation via request flow", () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, getUserInformation, action.payload)
      );
    });
    it("dispatch action fetchUserDataSuccess with user from call on success", () => {
      expect(saga.next(user).value).toEqual(
        put(fetchUserDataSuccess(user.data))
      );
    });

    it("dispatch action fetchUserDataFailure with user from call on fail", () => {
      const error = new Error("test error");
      const saga = fetchUserDataRequestSaga(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(put(fetchUserDataFailure(error)));
    });
  });
  describe("fetchTokenOwnerRequest branch", () => {
    const action = {
      type: fetchTokenOwnerRequest.toString(),
      payload: "token"
    };

    const user = {
      data: {
        login: "test",
        id: "1"
      }
    };

    const saga = fetchUserDataRequestSaga(action);
    it("Should call getTokenOwner via request flow", () => {
      expect(saga.next().value).toEqual(
        call(requestFlow, getTokenOwner, action.payload)
      );
    });
    it("dispatch action fetchUserDataSuccess with user from call on success", () => {
      expect(saga.next(user).value).toEqual(
        put(fetchUserDataSuccess(user.data))
      );
    });

    it("dispatch action fetchUserDataFailure with user from call on fail", () => {
      const error = new Error("test error");
      const saga = fetchUserDataRequestSaga(action);
      saga.next();
      expect(saga.throw(error).value).toEqual(put(fetchUserDataFailure(error)));
    });
  });
});
