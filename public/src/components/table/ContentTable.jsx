import React, { useState } from "react";
import { Table } from "antd";
import TableComponent from "./styled";
import HandleButton from "../handleButton/HandleButton";
import './style.css';

export default function ContentTable(props) {
    const [ handleShowToggle, setHandleShowToggle ] = useState(true);
    const [ handleShowText, setHandleShowText ] = useState('Show');

    const setCurrentEvent = (record) => {
            props.setCurrentEvent(record);
            props.setID(record.ID);
    };

    const handleEditButtonClick = (record) => {
        setCurrentEvent(record);
        props.setIsEdit(true);
        props.setDisable(true);
        props.setOpacity(0.5);
        props.setPointerEvents('none');
    };

    const handleRemoveButtonClick = (ID) => {
        props.props.removeEvent(ID);
        setTimeout(() => {
            props.props.getEventList();
        }, 500);
    };

    const handleShowClick = () => {
            setHandleShowToggle(false);
            setHandleShowText('Hide');
            props.props.getEventList(new Date(2020, 1, 1, 0, 0, 0, 0));
    };

    const handleHideClick = () => {
            setHandleShowToggle(true);
            setHandleShowText('Show');
            props.props.getEventList(new Date());
    };

    const [ data ] = useState({
        columns: [
            {
                title: 'Event name',
                dataIndex: 'eventName',
                key: 'eventName'
            },
            {
                title: 'Event type',
                dataIndex: 'eventType',
                key: 'eventType',
                filters: [
                    {
                        text: 'MEETING',
                        value: 'MEETING',
                    },
                    {
                        text: 'TEA PARTY',
                        value: 'TEA PARTY',
                    },
                    {
                        text: 'WEDDING',
                        value: 'WEDDING',
                    },
                    {
                        text: 'BIRTHDAY',
                        value: 'BIRTHDAY',
                    },
                    {
                        text: 'OTHER',
                        value: 'OTHER',
                    }
                ],
                onFilter: (value, record) => record.eventType.indexOf(value) === 0,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                sorter: (elem1, elem2) => elem1.date > elem2.date,
            },
            {
                title: 'Created on',
                dataIndex: 'createdOn',
                key: 'createdOn',
                sorter: (elem1, elem2) => elem1.createdOn > elem2.createdOn,
            },
            {
                title: 'Place',
                dataIndex: 'place',
                key: 'place'
            },
            {
                title: 'Additional information',
                dataIndex: 'additionalInfo',
                key: 'additionalInfo'
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return(
                        <div>

                            <HandleButton
                                type='link'
                                onClick={() => handleEditButtonClick(record)}
                            >
                                Edit
                            </HandleButton>

                            <HandleButton
                                type='link'
                                onClick={() => handleRemoveButtonClick(record.ID)}
                            >
                                Remove
                            </HandleButton>

                        </div>
                    )
                }
            }
        ]
    });

    return (
            <TableComponent opacity={props.opacity} pointerEvents={props.pointerEvents} >

                <HandleButton
                    type='primary'
                    shape='round'
                    icon='plus'
                    onClick={props.isClicked}
                    disable={props.disable}
                />

                <HandleButton
                    type='link'
                    onClick={
                        handleShowToggle ? () => handleShowClick() : () => handleHideClick()
                    }
                >
                    {handleShowText} expired
                </HandleButton>

                <Table
                    dataSource={props.props.data}
                    columns={data.columns}
                    rowClassName={
                        record => Date.parse(record.date) > Date.now() ? '' : 'disabled-row'
                    }
                />

            </TableComponent>
        )
}
