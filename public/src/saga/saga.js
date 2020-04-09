import { takeEvery } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import {
    fetchGetEventList,
    fetchCreateEvent,
    fetchEditEvent,
    fetchRemoveEvent
} from '../actions/eventAction';

function* mySaga() {
    yield takeEvery(TYPES.GET_EVENTLIST_REQUEST, fetchGetEventList);
    yield takeEvery(TYPES.POST_EVENT_REQUEST, fetchCreateEvent);
    yield takeEvery(TYPES.PUT_EVENT_REQUEST, fetchEditEvent);
    yield takeEvery(TYPES.REMOVE_EVENT_REQUEST, fetchRemoveEvent)
}

export default mySaga