import React, { useState } from 'react';
import { Input, Select, DatePicker } from 'antd';
import HandleButton from "../handleButton";
import moment from 'moment';
import Window from "./styled";

export default function AddEvent(props) {
    const { Option } = Select;
    const { TextArea } = Input;

    const [ selectValue, setSelectValue ] = useState(
        props.currentEvent.eventType ? props.currentEvent.eventType : 'MEETING'
    );
    const [ nameValue, setNameValue ] = useState(
        props.currentEvent.eventName ? props.currentEvent.eventName : undefined
    );
    const [ dateValue, setDateValue ] = useState(
        props.currentEvent.date ? props.currentEvent.date : moment(new Date()).format('YYYY-MM-DD')
    );
    const [ placeValue, setPlaceValue ] = useState(
        props.currentEvent.place ? props.currentEvent.place : undefined
    );
    const [ addInfValue, setAddInfValue ] = useState(
        props.currentEvent.additionalInfo ? props.currentEvent.additionalInfo : undefined
    );

    if(
        nameValue !== undefined &&
        dateValue !== null &&
        placeValue !== undefined
    ) {
        props.setHandleButtonDisabled(false);
    }

    const handleButtonClick = () => {
        if(
            nameValue !== undefined ||
            dateValue !== undefined ||
            placeValue !== undefined
        ) {
            if (!props.isEdit) {
                if (
                    nameValue &&
                    dateValue &&
                    placeValue
                ) {
                    console.log('CREATE');
                    props.props.createEvent(
                        selectValue,
                        nameValue,
                        dateValue,
                        placeValue,
                        addInfValue
                    );
                }
            } else if (props.isEdit) {
                props.props.editEvent(
                    props.ID,
                    selectValue,
                    nameValue,
                    dateValue,
                    placeValue,
                    addInfValue
                );
            }
            props.setDisable(false);
            props.setOpacity(1);
            props.setPointerEvents('');
            setTimeout(() => props.props.getEventList(), 500);
            props.setCurrentEvent({});
        }
    };

    const handleCancelClick = () => {
        props.setHandleButtonDisabled(true);
        props.setDisable(false);
        props.setOpacity(1);
        props.setPointerEvents('');
        props.setCurrentEvent({});
    };

    let dataToDefault = { eventType: selectValue };
    if(props.currentEvent !== undefined && props.isEdit) {
        dataToDefault = {
            ...props.currentEvent
        };
    }

    return(
        <Window>
                <div>
                    <Select
                        defaultValue={dataToDefault.eventType}
                        style={{ width: 350, margin: 10 }}
                        onChange={value => {
                            setSelectValue(value);
                        }}
                    >
                        <Option value="MEETING">
                            MEETING
                        </Option>
                        <Option value="TEA PARTY">
                            TEA PARTY
                        </Option>
                        <Option value="WEDDING">
                            WEDDING
                        </Option>
                        <Option value="BIRTHDAY">
                            BIRTHDAY
                        </Option>
                        <Option value="OTHER">
                            OTHER
                        </Option>
                    </Select>
                </div>

                <div>
                    <Input
                        placeholder="Event name"
                        defaultValue={dataToDefault.eventName}
                        style={{ width: 350, margin: 10 }}
                        onChange={({target: { value }}) => {
                            setNameValue(value);
                        }}
                    />
                </div>

                <div>
                    <DatePicker
                        style={{ width: 350, margin: 10 }}
                        defaultValue={moment(dateValue, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => {
                            setDateValue(dateString);
                        }}
                    />
                </div>

                <div>
                    <Input
                        placeholder="Place"
                        defaultValue={dataToDefault.place}
                        style={{ width: 350, margin: 10 }}
                        onChange={({target: { value }}) => {
                            setPlaceValue(value);
                        }}
                    />
                </div>

                <div>
                    <TextArea
                        placeholder="Addition information"
                        defaultValue={dataToDefault.additionalInfo}
                        style={{ width: 350, margin: 10 }}
                        onChange={({target: { value }}) => {
                            setAddInfValue(value);
                        }}
                        autoSize
                    />
                </div>

                <HandleButton
                    onClick={() => handleButtonClick()}
                    type='primary'
                    disabled={props.handleButtonDisabled}
                    style={{ margin: 10 }}
                >
                    Submit
                </HandleButton>

                <HandleButton
                    onClick={() => handleCancelClick()}
                    style={{ margin: 10 }}
                >
                    Cancel
                </HandleButton>
        </Window>
    )
}