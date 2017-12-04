import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { authorize, logout } from "../actions/auth";

const token = handleActions(
  {
    [authorize]: (state, action) => action.payload,
    [logout]: () => null
  },
  null
);
const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false
  },
  false
);

export default combineReducers({ token, isAuthorized });

export const getToken = state => state.auth.token;
export const getIsAuthorized = state => state.auth.isAuthorized;
