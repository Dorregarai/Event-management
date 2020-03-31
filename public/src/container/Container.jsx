import React, {useState} from 'react';
import ContentTable from "../components/table";
import Header from "../components/header";
import AddEvent from "../components/addEvent-Window"

export default function Container(props) {
    const [ isAddButtonClicked, setAddButtonClicked ] = useState(false);
    const [ toggleAddEvent, setToggleAddEvent ] = useState(false);
    const [ tableOpacity, setTableOpacity ] = useState(1);
    const [ pointerEventsTable, setPointerEventsTable ] = useState('');

    let elem;
    if(toggleAddEvent) {
        elem = <AddEvent
            props={props}
            disable={toggleAddEvent}
            setDisable={setToggleAddEvent}
            setOpacity={setTableOpacity}
            setPointerEvents={setPointerEventsTable}
        />;
    }

    const handleAddButtonClick = () => {
        setAddButtonClicked(!isAddButtonClicked);
        setToggleAddEvent(true);
        setTableOpacity(0.5);
        setPointerEventsTable('none');
    };

    return(
        <div className="container" style={{ margin: 0 }}>
            <Header
                isClicked={handleAddButtonClick}
                disabled={toggleAddEvent}
            />
            <ContentTable
                props={props}
                opacity={tableOpacity}
                pointerEvents={pointerEventsTable}
            />
            {elem}
        </div>
    )
}