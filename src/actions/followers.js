import { createActions } from "redux-actions";

export const {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure,
  clearFollowersData
} = createActions({
  FETCH_FOLLOWERS_REQUEST: undefined,
  FETCH_FOLLOWERS_SUCCESS: undefined,
  FETCH_FOLLOWERS_FAILURE: undefined,
  CLEAR_FOLLOWERS_DATA: undefined
});
