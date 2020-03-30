import { takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import {
    fetchGetEventList,
    fetchSignInUser,
    fetchCreateEvent
} from '../actions/eventAction';

function* mySaga() {
    yield takeEvery(TYPES.GET_EVENTLIST_REQUEST, fetchGetEventList);
    yield takeEvery(TYPES.POST_EVENT_REQUEST, fetchCreateEvent);
    yield takeEvery(TYPES.POST_USER_LOG_REQUEST, fetchSignInUser)
}

export default mySaga