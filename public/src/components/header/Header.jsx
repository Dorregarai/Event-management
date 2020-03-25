import React from "react";
import { PageHeader } from "antd";
import LogButton from "../logButton-hooks";

export default function Header() {
    return (
        <div>
            <PageHeader
                title="Main"
                subTitle="This is the main page"
                extra={[
                    <LogButton type="primary" child="Log In" isVisible="true" />,
                    <LogButton child="Sign In" isVisible="true" />,
                ]}
            />
        </div>
    )
}