import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../actions/followers";

import { logout } from "../actions/auth";

const isFetching = handleActions(
  {
    [fetchFollowersRequest]: () => true,
    [fetchFollowersSuccess]: () => false,
    [fetchFollowersFailure]: () => false,
    [logout]: () => false
  },
  false
);
const isFetched = handleActions(
  {
    [fetchFollowersRequest]: () => false,
    [fetchFollowersSuccess]: () => true,
    [fetchFollowersFailure]: () => true,
    [logout]: () => false
  },
  false
);

const data = handleActions(
  {
    [fetchFollowersSuccess]: (state, action) => action.payload,
    [fetchFollowersRequest]: () => [],
    [logout]: () => []
  },
  []
);

const error = handleActions(
  {
    [fetchFollowersFailure]: (state, action) => action.payload,
    [fetchFollowersRequest]: () => null,
    [fetchFollowersSuccess]: () => null,
    [logout]: () => null
  },
  null
);

export default combineReducers({ isFetching, isFetched, error, data });

export const getUserFollowers = state => state.followers.data;
export const getIsFetching = state => state.followers.isFetching;
export const getIsFetched = state => state.followers.isFetched;
export const getError = state => state.followers.error;
