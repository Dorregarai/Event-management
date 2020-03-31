import axios from 'axios';
import * as TYPES from './types';
import { call, put } from 'redux-saga/effects';

const apiGetEventList = page => {
    return axios
        .get('http://localhost:3001/api', {
        params: {
            page
        }
    })
        .then(response => response.data)
};

const apiCreateEvent = (data) => {
    return axios
        .post('http://localhost:3001/api', {
            eventType: data.eventType,
            eventName: data.eventName,
            date: data.date,
            place: data.place,
            additionalInfo: data.addInfo
    })
};

const apiSignInUser = (login, password) => {
    return axios.post('http://localhost:3001/api', {
        body: {
            login,
            password
        }
    })
};

export function* fetchGetEventList(action) {
    try {
        const eventList = yield call(apiGetEventList, action.page);
        yield put({ type: TYPES.GET_EVENTLIST_SUCCESS, payload: eventList })
    } catch (error) {
        yield put({ type: TYPES.GET_EVENTLIST_FAILURE, payload: error })
    }
}

export function* fetchCreateEvent(action) {
    try {
        const eventToCreate = yield call(apiCreateEvent, action);
        yield put({ type: TYPES.POST_EVENT_SUCCESS, payload: eventToCreate })
    } catch (error) {
        yield put({ type: TYPES.POST_EVENT_FAILURE, payload: error })
    }
}

export  function* fetchSignInUser(action) {
    try {
        const logData = yield call(apiSignInUser, action);
        yield put({ type: TYPES.POST_USER_LOG_SUCCESS, payload: logData })
    } catch (error) {
        yield put({ type: TYPES.POST_USER_LOG_FAILURE, payload: error })
    }
}
