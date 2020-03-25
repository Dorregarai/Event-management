import axios from 'axios';
import * as TYPES from './types';
import { call, put } from 'redux-saga/effects';

const apiGetTracks = page => {
    return axios.get('http://localhost:3001/api/users/', {
        params: {
            page
        }
    })
        .then(response => response.data)
};

const signInUser = (login, password) => {
    return axios.post('http://localhost:3001/api/users/', {
        body: {
            login,
            password
        }
    })
};

export function* fetchGetTracks(action) {
    try {
        const tracks = yield call(apiGetTracks, action.page);
        yield put({ type: TYPES.GET_TRACKS_SUCCESS, payload: tracks })
    } catch (error) {
        yield put({ type: TYPES.GET_TRACKS_FAILURE, payload: error })
    }
}

export  function* fetchSignInUser(action) {
    try {
        const logData = yield call(signInUser, action);
        yield put({ type: TYPES.POST_USER_LOG_SUCCESS, payload: logData })
    } catch (error) {
        yield put({ type: TYPES.POST_USER_LOG_FAILURE, payload: error })
    }
}
