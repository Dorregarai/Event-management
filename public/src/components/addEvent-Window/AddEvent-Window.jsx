import React, { useState } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import Window from "./styled";

export default function AddEvent(props) {
    const { Option } = Select;
    const { TextArea } = Input;

    const [ selectValue, setSelectValue ] = useState('MEETING');
    const [ nameValue, setNameValue ] = useState('');
    const [ dateValue, setDateValue ] = useState('');
    const [ placeValue, setPlaceValue ] = useState('');
    const [ addInfValue, setAddInfValue ] = useState('');
    let state = {
        selectValue,
        nameValue,
        dateValue,
        placeValue,
        addInfValue
    };

    const handleButtonClick = () => {
        if(
            state.nameValue &&
            state.dateValue &&
            state.placeValue
        ) {
            props.props.createEvent(
                state.selectValue,
                state.nameValue,
                state.dateValue,
                state.placeValue,
                state.addInfValue
            );
            props.setDisable(false);
            props.setOpacity(1);
            props.setPointerEvents('');
        }
    };

    return(
        <Window>
            <div>
                <Select
                    defaultValue={selectValue}
                    style={{ width: 350, margin: 10 }}
                    onChange={value => setSelectValue(value)}
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
                    onChange={({target: { value }}) => setNameValue(value)}
                />
            </div>
            <div>
                <DatePicker
                    style={{ width: 350, margin: 10 }}
                    onChange={(date, dateString) => setDateValue(dateString)}
                />
            </div>
            <div>
                <Input
                    placeholder="Place"
                    style={{ width: 350, margin: 10 }}
                    onChange={({target: { value }}) => setPlaceValue(value)}
                />
            </div>
            <div>
                <TextArea
                    placeholder="Addition information"
                    style={{ width: 350, margin: 10 }}
                    onChange={({target: { value }}) => setAddInfValue(value)}
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
        </Window>
    )
}