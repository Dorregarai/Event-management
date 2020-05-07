import Container from './Container';
import * as TYPES from '../actions/types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        data: state.eventReducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventList: showExpired => {
            dispatch({
                type: TYPES.GET_EVENTLIST_REQUEST,
                showExpired
            })
        },
        createEvent: (eventType, eventName, date, place, addInfo) => {
            dispatch({
                type: TYPES.POST_EVENT_REQUEST,
                eventType,
                eventName,
                date,
                place,
                addInfo
            })
        },
        editEvent: (id, eventType, eventName, date, place, addInfo) => {
            dispatch({
                type: TYPES.PUT_EVENT_REQUEST,
                id,
                eventType,
                eventName,
                date,
                place,
                addInfo
            })
        },
        removeEvent: id => {
            dispatch({
                type: TYPES.REMOVE_EVENT_REQUEST,
                _id: id
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
