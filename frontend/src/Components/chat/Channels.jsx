import { Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {changeCurrent} from '../../store/channelsSlice';

const Channels = () => {
    const dispatch = useDispatch();
    const {channels, currentChannelId} = useSelector((state) => state.channelsInfo);
    const addChannel = () => console.log('ADDED!');
    const changeChannel = (id) => { console.log(id); };

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    variant="light"
                    className="p-0 text-primary btn btn-group-vertical"
                    onClick={addChannel}
                >
                    <BsPlusSquare />
                </Button>
            </div>
            <Nav
                defaultActiveKey="#general"
                className="flex-column nav-pills nav-fill px-2"
                as="ul"
            >
                {channels.map((channel) => (
                    <Nav.Item key={channel.id} className="w-100" as="li">
                        <Button
                            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                            className="w-100 rounded-0 text-start"
                            onClick={() => dispatch(changeCurrent(channel.id))}
                        >
                            <span className="me-1">#</span>
                            {channel.name}
                        </Button>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};

export default Channels;