import React, { useState, useCallback } from "react";
import {Table, Button, Tooltip} from "antd";
import TableComponent from "./styled";
import AddButton from "../addButton/AddButton";

export default function ContentTable(props) {
    const [ selectedRowKey, setSelectedRowKey ] = useState();
    const [ disableButton, setDisableButton ] = useState(true);

    const onSelectChange = useCallback(selectedRowKey => {
            console.log('selectedRowKeys changed: ', selectedRowKey);
            setSelectedRowKey(selectedRowKey);
            setDisableButton(false);
            return selectedRowKey;
        }, []);

    const rowSelection = {
        selectedRowKey,
        onChange: onSelectChange,
        type: 'radio'
    };

    if(props.props.data !== undefined && selectedRowKey) {
        let selectedEvent = props.props.data[selectedRowKey];
        let id = selectedEvent.ID;
        props.setID(id);
    }

    const handleEditButtonClick = () => {
        props.setIsEdit(true);
        props.setDisable(true);
        props.setOpacity(0.5);
        props.setPointerEvents('none');
    };

    const handleRemoveButtonClick = () => {
        props.props.removeEvent(props.ID);
        setTimeout(() => {
            props.props.getEventList();
        }, 500);
    };

    const [ data ] = useState({
        columns: [
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
        ]
    });

    return (
            <TableComponent opacity={props.opacity} pointerEvents={props.pointerEvents} >
                <AddButton isClicked={props.isClicked} disabled={props.disabled} />
                <Tooltip title='Select event to edit or delete' >
                    <Button
                        style={{marginRight: 10}}
                        type='primary'
                        shape='round'
                        icon='edit'
                        onClick={handleEditButtonClick}
                        disabled={disableButton}
                    />
                </Tooltip>
                <Tooltip title='Select event to edit or delete' >
                    <Button
                        style={{marginRight: 10}}
                        type='primary'
                        shape='round'
                        icon='delete'
                        onClick={handleRemoveButtonClick}
                        disabled={disableButton}
                    />
                </Tooltip>
                <Table
                    rowSelection={rowSelection}
                    dataSource={props.props.data}
                    columns={data.columns}
                />
            </TableComponent>
        )
}