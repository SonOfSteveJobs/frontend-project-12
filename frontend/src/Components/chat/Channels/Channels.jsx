import { Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {openModal} from '../../../store/modalSlice';
import Channel from './Channel';

const Channels = () => {
    const dispatch = useDispatch();
    const {channels} = useSelector((state) => state.channelsInfo);

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    variant="light"
                    className="p-0 text-primary btn btn-group-vertical"
                    onClick={() => dispatch(openModal('addChannel'))}
                >
                    <BsPlusSquare size={20}/>
                </Button>
            </div>
            <Nav
                defaultActiveKey="#general"
                className="flex-column nav-pills nav-fill px-2"
                as="ul"
            >
                {channels.map((channel) => (
                    <Channel channel={channel} key={channel.id}/>
                ))}
            </Nav>
        </div>
    );
};

export default Channels;