import React from 'react';
import ContentTable from "../components/table";
import Header from "../components/header";
import AddEvent from "../components/addEvent-Window"

export default function Container(props) {
    return(
        <div className="container" style={{ margin: 0 }}>
            <Header />
            <ContentTable props={props} />
            <AddEvent props={props} />
        </div>
    )
}