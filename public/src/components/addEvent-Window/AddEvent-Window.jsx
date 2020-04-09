import React, { useState } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import Window from "./styled";

export default function AddEvent(props) {
    const { Option } = Select;
    const { TextArea } = Input;

    const [ selectValue, setSelectValue ] = useState('MEETING');
    const [ nameValue, setNameValue ] = useState(undefined);
    const [ dateValue, setDateValue ] = useState(undefined);
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
                    tempState.nameValue &&
                    tempState.dateValue &&
                    tempState.placeValue
                ) {
                    console.log('CREATE');
                    props.props.createEvent(
                        tempState.selectValue,
                        tempState.nameValue,
                        tempState.dateValue,
                        tempState.placeValue,
                        tempState.addInfValue
                    );
                }
            } else if(props.isEdit){
                    console.log(props.ID);
                props.props.editEvent(
                    props.ID,
                    tempState.selectValue,
                    tempState.nameValue,
                    tempState.dateValue,
                    tempState.placeValue,
                    tempState.addInfValue
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

    return(
        <Window>

            <div>
                <Select
                    defaultValue={selectValue}
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
                    onChange={(date, dateString) => {
                        setDateValue(dateString);
                        props.setState(tempState)
                    }}
                />
            </div>

            <div>
                <Input
                    placeholder="Place"
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