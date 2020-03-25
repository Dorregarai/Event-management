import React, { useState } from 'react';
import { Button } from "antd";
import LoginWindow from "../loginWindow";

export default function LogButton(props) {
    const [isClicked, setIsClicked] = useState(false);

    function buttonRender() {
        return(
            <Button type={props.type} onClick={() => {
                setIsClicked(!isClicked);
                console.log(isClicked);
            }}>
                { props.child }
            </Button>
        )
    }

    if(isClicked){
        return(
            <LoginWindow child={props.child} />
        )
    }
    return (
        buttonRender()
    )
}