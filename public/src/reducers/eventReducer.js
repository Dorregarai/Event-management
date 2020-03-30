import * as TYPES from "../actions/types";

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_EVENTLIST_REQUEST:
            return Object.assign({}, state, {
                page: action.page
            });
        case TYPES.GET_EVENTLIST_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload
            });
        case TYPES.POST_EVENT_REQUEST:
            console.log(action);
            return Object.assign({}, state, {
                eventToCreate: action
            });
        case TYPES.POST_EVENT_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload
            });
        default:
            return state;
    }
}