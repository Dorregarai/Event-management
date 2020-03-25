import { takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import {
    fetchGetTracks,
    fetchSignInUser
} from '../actions/playerAction';

function* mySaga() {
    yield takeEvery(TYPES.GET_TRACKS_REQUEST, fetchGetTracks);
    yield takeEvery(TYPES.POST_USER_LOG_REQUEST, fetchSignInUser)
}

export default mySaga