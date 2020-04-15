import React, { useState, useEffect } from 'react';
import ContentTable from "../components/table";
import Header from "../components/header";
import AddEvent from "../components/addEvent-Window"


export default function Container(props) {
    const [ isAddButtonClicked, setAddButtonClicked ] = useState(false);
    const [ toggleAddEvent, setToggleAddEvent ] = useState(false);
    const [ tableOpacity, setTableOpacity ] = useState(1);
    const [ pointerEventsTable, setPointerEventsTable ] = useState('');
    const [ isEdit, setIsEdit ] = useState(false);
    const [ eventID, setEventID ] = useState();
    const [ currentEvent, setCurrentEvent ] = useState({});
    const [ handleButtonDisabled, setHandleButtonDisabled ] = useState(true);

    useEffect(() => {
        props.getEventList(1);
    }, [props.data.length]);

    let elem;
    if(toggleAddEvent) {
        elem = <AddEvent
            props={props}
            setDisable={setToggleAddEvent}
            setOpacity={setTableOpacity}
            setPointerEvents={setPointerEventsTable}
            isEdit={isEdit}
            ID={eventID}
            currentEvent={currentEvent}
            handleButtonDisabled={handleButtonDisabled}
            setHandleButtonDisabled={setHandleButtonDisabled}
        />;
    }

    const handleAddButtonClick = () => {
        setIsEdit(false);
        setAddButtonClicked(!isAddButtonClicked);
        setToggleAddEvent(true);
        setTableOpacity(0.5);
        setPointerEventsTable('none');
    };

    return(
        <div className="container" style={{ margin: 0 }}>
            <Header />
            <ContentTable
                props={props}
                setID={setEventID}
                opacity={tableOpacity}
                pointerEvents={pointerEventsTable}
                disable={toggleAddEvent}
                setDisable={setToggleAddEvent}
                setOpacity={setTableOpacity}
                setPointerEvents={setPointerEventsTable}
                setIsEdit={setIsEdit}
                setCurrentEvent={setCurrentEvent}
                isClicked={() => handleAddButtonClick()}
            />
            {elem}
        </div>
    )
}