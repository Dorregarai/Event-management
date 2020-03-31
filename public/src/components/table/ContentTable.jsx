import React, { useEffect } from "react";
import { Table } from "antd";
import TableComp from "./styled";

export default function ContentTable(props) {
    useEffect(() => {
        props.props.getEventList(1)
    });

    const columns = [
        {
            title: 'Event name',
            dataIndex: 'eventName',
            key: 'ID'
        },
        {
            title: 'Event type',
            dataIndex: 'eventType',
            key: 'eventType'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Created on',
            dataIndex: 'createdOn',
            key: 'createdOn'
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
        }
    ];
    return (
            <TableComp opacity={props.opacity} pointerEvents={props.pointerEvents} >
                <Table dataSource={props.props.data.events} columns={columns} />
            </TableComp>
        )
}