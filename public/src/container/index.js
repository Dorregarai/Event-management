import Container from "./Container";
import * as TYPES from '../actions/types';
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        data: state.eventReducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventList: page => {
            dispatch({
                type: TYPES.GET_EVENTLIST_REQUEST,
                page
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
        /*userLogIn: (username, password) => {
            dispatch({
                type: TYPES.POST_USER_LOG_REQUEST,
                username,
                password
            })
        }*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)