import React from "react";
import { PageHeader } from "antd";
//import LogButton from "../logButton-hooks";
import AddButton from "../addButton";

export default function Header(props) {
    return (
        <div>
            <PageHeader
                title="Main"
                subTitle="This is the main page"
                /*extra={[
                    <LogButton type="primary" child="Log In" isVisible="true" />,
                    <LogButton child="Sign In" isVisible="true" />,
                ]}*/
            />
            <AddButton isClicked={props.isClicked} disabled={props.disabled} />
        </div>
    )
}