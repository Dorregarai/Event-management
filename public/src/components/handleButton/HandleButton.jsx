import React from 'react';
import { Button } from 'antd';

export default function HandleButton(props) {
    return (
        <Button
            style={{marginRight: 10}}
            type={props.type}
            shape={props.shape}
            icon={props.icon}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    )
}