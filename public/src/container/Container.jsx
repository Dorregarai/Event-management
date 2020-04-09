import React, { useState, useEffect } from 'react';
import ContentTable from "../components/table";
import Header from "../components/header";
import AddEvent from "../components/addEvent-Window"


export default function Container(props) {
    useEffect(() => {
        props.getEventList(1);
    }, [props.data.length]);

    const [ isAddButtonClicked, setAddButtonClicked ] = useState(false);
    const [ toggleAddEvent, setToggleAddEvent ] = useState(false);
    const [ tableOpacity, setTableOpacity ] = useState(1);
    const [ pointerEventsTable, setPointerEventsTable ] = useState('');
    const [ isEdit, setIsEdit ] = useState(false);
    const [ state, setState ] = useState();
    const [ eventID, setEventID ] = useState();
    const [ currentEvent, setCurrentEvent ] = useState();

    let elem;
    if(toggleAddEvent) {
        elem = <AddEvent
            props={props}
            disable={toggleAddEvent}
            setDisable={setToggleAddEvent}
            setOpacity={setTableOpacity}
            setPointerEvents={setPointerEventsTable}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            state={state}
            setState={setState}
            ID={eventID}
            currentEvent={currentEvent}
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
                state={state}
                setState={setState}
                ID={eventID}
                setCurrentEvent={setCurrentEvent}
                currentEvent={currentEvent}
                isClicked={handleAddButtonClick}
                disabled={toggleAddEvent}
            />
            {elem}
        </div>
    )
}

/*class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddButtonClicked: false,
            toggleAddEvent: false,
            tableOpacity: 1,
            pointerEventsTable: '',
            isEdit: false,
            eventState: {},
            eventID: ''
        }
    };

    componentDidMount() {
        this.props.getEventList(1);

        console.log(this.props);
    }

    renderElem = () => {
        if (this.state.toggleAddEvent) {
            return(
                <AddEvent
                props={this.props}
                disable={this.state.toggleAddEvent}
                isEdit={this.isEdit}
                state={this.state.eventState}
                setState={this.setState}
            />
        )
        }
    };

    handleAddButtonClick = () => {
        this.setState({ isEdit: false });
        this.setState({ addButtonClicked: !this.state.isAddButtonClicked });
        this.setState({ toggleAddEvent: true });
        this.setState({ tableOpacity: 0.5 });
        this.setState({ pointerEventsTable: 'none' });
    };

    render() {
        return (
            <div className="container" style={{ margin: 0 }}>
                <Header
                    isClicked={this.handleAddButtonClick}
                    disabled={this.state.toggleAddEvent}
                />
                <ContentTable
                    props={this.props}
                    opacity={this.state.tableOpacity}
                    pointerEvents={this.state.pointerEventsTable}
                    disable={this.state.toggleAddEvent}
                    state={this.state.eventState}
                    setState={this.setState}
                />
                { this.renderElem() }
            </div>
        )
    }
}*/