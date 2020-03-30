import React from 'react';
import { Button } from 'antd';

export default function AddButton(props) {
    return (
        <Button type='primary' shape='round' icon='plus' onClick={() => props.isClicked()}/>
    )
}