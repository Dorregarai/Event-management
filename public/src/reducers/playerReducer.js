//import { PlayerAction } from '../actions';
import * as TYPES from "../actions/types";

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_TRACKS_REQUEST:
            return Object.assign({}, state, {
                page: action.page
            });
        case TYPES.GET_TRACKS_SUCCESS:
            //console.log(action);
            return Object.assign({}, state, {
                data: action.payload.result
            });
        default:
            return state;
    }
}