import * as TYPES from "../actions/types";

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_EVENTLIST_REQUEST:
            return Object.assign({}, state, {
                page: action
            });
        case TYPES.GET_EVENTLIST_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload.events
            });
        case TYPES.POST_EVENT_REQUEST:
            return Object.assign({}, state, {
                eventToCreate: action
            });
        case TYPES.POST_EVENT_SUCCESS:
            return Object.assign({}, state, {
                dataPost: action.payload
            });
        case TYPES.PUT_EVENT_REQUEST:
            return Object.assign({}, state, {
                eventToEdit: action
            });
        case TYPES.PUT_EVENT_SUCCESS:
            return Object.assign({}, state, {
                dataPut: action.payload
            });
        case TYPES.REMOVE_EVENT_REQUEST:
            return Object.assign({}, state, {
                eventToRemove: action._id
            });
        case TYPES.REMOVE_EVENT_SUCCESS:
            return Object.assign({}, state, {
                dataRem: action.payload
            });
        default:
            return state;
    }
}