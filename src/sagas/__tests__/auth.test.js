import { authFlow } from "../auth";
import { authorize, logout } from "../../actions/auth";
import { select, call, take, put } from "redux-saga/effects";
import { getIsAuthorized } from "../../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../../localStorage";
import { setTokenApi, clearTokenApi } from "../../api";

describe("Сага authFlow", () => {
  const saga = authFlow();
  const token = 123;
  describe("Сценарий без токена авторизации в localstorage", () => {
    it("1. Эффект select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Эффект call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });
    it("3. Эффект take с ожиданием authorize", () => {
      expect(saga.next().value).toEqual(take(authorize));
    });

    it("4. Эффект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token)
      );
    });

    it("5. Эффект call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("6. Эффект take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("7. Эффект call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Эффект call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Сценарий c токеном авторизации из localstorage", () => {
    it("1. Select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });
    it("2. Should call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });
    it("3. Should dispatch athorize action", () => {
      expect(saga.next(token).value).toEqual(put(authorize(token)));
    });
    it("4. Should call(setTokenApi, token) with token value, from previous step", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token)
      );
    });

    it("5. Call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("6. Listen take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("7. Call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });
});
