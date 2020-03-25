import React, { useEffect } from "react";
import Header from '../../components/header';
import { Table } from "antd";

export default function ContentTable(props) {
    useEffect(() => {
        props.getTracksAll(1)
    });

    const columns = [
        {
            title: 'Track',
            dataIndex: 'name',
            key: 'track'
        },
        {
            title: 'Artist',
            dataIndex: 'artistName',
            key: 'artist'
        }
    ];

        //console.log(props);
        return (
            <div>
                <Header />
                <Table dataSource={props.data} columns={columns} />
            </div>
        )
}