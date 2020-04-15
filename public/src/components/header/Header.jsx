import React from "react";
import { PageHeader } from "antd";

export default function Header() {
    return(
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            title="Title"
            subTitle="This is a subtitle"
        />
    )
}
