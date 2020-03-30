import React, { useState } from 'react';
import { Input, Button, Select, DatePicker } from 'antd';

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

    return(
        <div>
            <div>
                <Select
                    defaultValue={selectValue}
                    style={{ width: 200 }}
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
                    style={{ width: 200 }}
                    onChange={({target: { value }}) => setNameValue(value)}
                />
            </div>
            <div>
                <DatePicker
                    style={{ width: 200 }}
                    onChange={(date, dateString) => setDateValue(dateString)}
                />
            </div>
            <div>
                <Input
                    placeholder="Place"
                    style={{ width: 200 }}
                    onChange={({target: { value }}) => setPlaceValue(value)}
                />
            </div>
            <div>
                <TextArea
                    placeholder="Addition information"
                    style={{ width: 200 }}
                    onChange={({target: { value }}) => setAddInfValue(value)}
                    autoSize
                />
            </div>
            <Button
                onClick={() => props.props.createEvent(
                state.selectValue,
                state.nameValue,
                state.dateValue,
                state.placeValue,
                state.addInfValue
                )}
                type='primary'
            >
                Submit
            </Button>
        </div>
    )
}