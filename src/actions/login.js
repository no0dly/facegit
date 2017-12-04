import { createActions } from "redux-actions";

export const {
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginFailure
} = createActions({
  FETCH_LOGIN_REQUEST: undefined,
  FETCH_LOGIN_SUCCESS: undefined,
  FETCH_LOGIN_FAILURE: undefined
});
