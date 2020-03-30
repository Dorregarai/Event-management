import React, {useState} from "react";
import { PageHeader } from "antd";
//import LogButton from "../logButton-hooks";
import AddButton from "../addButton";

export default function Header() {
    const [ isAddButtonClicked, setAddButtonClicked ] = useState(false);

    function handleAddButtonClick() {
    setAddButtonClicked(!isAddButtonClicked);
    console.log(isAddButtonClicked);
    }

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
            <AddButton isClicked={handleAddButtonClick}/>
        </div>
    )
}