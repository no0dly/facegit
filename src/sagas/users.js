import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  fetchTokenOwnerRequest
} from "../actions/users";

import { getUserInformation, getTokenOwner } from "../api";

import requestFlow from "./request";

export function* fetchUserDataRequestSaga(action) {
  try {
    let response;
    if (fetchTokenOwnerRequest.toString() === action.type) {
      response = yield call(requestFlow, getTokenOwner, action.payload);
    } else {
      response = yield call(requestFlow, getUserInformation, action.payload);
    }
    yield put(fetchUserDataSuccess(response.data));
  } catch (error) {
    yield put(fetchUserDataFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(fetchUserDataRequest, fetchUserDataRequestSaga);
  yield takeLatest(fetchTokenOwnerRequest, fetchUserDataRequestSaga);
}
