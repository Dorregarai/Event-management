import React, { useState } from "react";
import { Table } from "antd";
import TableComponent from "./styled";
import HandleButton from "../handleButton/HandleButton";

export default function ContentTable(props) {
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
                sorter: (a, b) => a.date > b.date,
            },
            {
                title: 'Created on',
                dataIndex: 'createdOn',
                key: 'createdOn',
                sorter: (a, b) => a.createdOn > b.createdOn,
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

                <Table
                    dataSource={props.props.data}
                    columns={data.columns}
                />

            </TableComponent>
        )
}