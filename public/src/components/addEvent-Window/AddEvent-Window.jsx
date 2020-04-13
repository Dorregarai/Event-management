import React, { useState } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import Window from "./styled";

export default function AddEvent(props) {
    const { Option } = Select;
    const { TextArea } = Input;

    const [ selectValue, setSelectValue ] = useState('MEETING');
    const [ nameValue, setNameValue ] = useState(undefined);
    const [ dateValue, setDateValue ] = useState(null);
    const [ placeValue, setPlaceValue ] = useState(undefined);
    const [ addInfValue, setAddInfValue ] = useState(undefined);
    let tempState = {
        selectValue,
        nameValue,
        dateValue,
        placeValue,
        addInfValue
    };

    const handleButtonClick = () => {
            if(!props.isEdit) {
                if(
                    props.state.nameValue &&
                    props.state.dateValue &&
                    props.state.placeValue
                ) {
                    console.log('CREATE');
                    props.props.createEvent(
                        props.state.selectValue,
                        props.state.nameValue,
                        props.state.dateValue,
                        props.state.placeValue,
                        props.state.addInfValue
                    );
                }
            } else if(props.isEdit){
                props.props.editEvent(
                    props.ID,
                    props.state.selectValue,
                    props.state.nameValue,
                    props.state.dateValue,
                    props.state.placeValue,
                    props.state.addInfValue
                );
            }
            props.setDisable(false);
            props.setOpacity(1);
            props.setPointerEvents('');
            setTimeout(() => props.props.getEventList(), 500)
        };

    const handleCancelClick = () => {
        props.setDisable(false);
        props.setOpacity(1);
        props.setPointerEvents('');
    };

    let dataToDefault = { eventType: selectValue };
    if(props.currentEvent !== undefined && props.isEdit) {
        dataToDefault = {
            ...props.currentEvent
        }
    }

    return(
        <Window>

            <div>
                <Select
                    defaultValue={dataToDefault.eventType}
                    style={{ width: 350, margin: 10 }}
                    onChange={value => {
                        setSelectValue(value);
                        props.setState(tempState)
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
                    required
                    onChange={({target: { value }}) => {
                        setNameValue(value);
                        props.setState(tempState)
                    }}
                />
            </div>

            <div>
                <DatePicker
                    style={{ width: 350, margin: 10 }}
                    defaultValue={moment(dataToDefault.date, 'YYYY-MM-DD')}
                    onChange={(date, dateString) => {
                        setDateValue(dateString);
                        props.setState(tempState)
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
                        props.setState(tempState)
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
                        props.setState(tempState)
                    }}
                    autoSize
                />
            </div>

            <Button
                onClick={handleButtonClick}
                type='primary'
                style={{ margin: 10 }}
            >
                Submit
            </Button>

            <Button
                onClick={handleCancelClick}
                style={{ margin: 10 }}
            >
                Cancel
            </Button>
        </Window>
    )
}