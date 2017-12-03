import {fork} from 'redux-saga/effects';
// import {fetchUserWatch} from './users';
// import {fetchUserReposWatch} from './repos';
// import {fetchFollowersWatch} from './followers';
import {setTokenWatch} from './auth';

export default function*() {
  yield fork(setTokenWatch);
  // yield fork(fetchUserWatch);
  // yield fork(fetchUserReposWatch);
  // yield fork(fetchFollowersWatch);
}
