import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../actions/followers";

import { getUserFollowers } from "../api";

import requestFlow from "./request";

export function* fetchFollowersRequestSaga(action) {
  try {
    const followers = yield call(requestFlow, getUserFollowers, action.payload);
    yield put(fetchFollowersSuccess(followers.data));
  } catch (error) {
    yield put(fetchFollowersFailure(error));
  }
}

export function* fetchFollowersWatch() {
  yield takeLatest(fetchFollowersRequest, fetchFollowersRequestSaga);
}
