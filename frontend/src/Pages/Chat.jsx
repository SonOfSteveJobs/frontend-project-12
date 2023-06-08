import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context';
import axios from 'axios';
import getAuthHeader from '../API/getAuthHeader';
import getChatData from '../API/getChatData';
import { useDispatch, useSelector } from 'react-redux';
import {getChannelsInfo} from '../store/channelsSlice';
import {Container} from 'react-bootstrap';
import Channels from '../Components/chat/Channels';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const dispatch = useDispatch();
    const {channels, currentChannelId} = useSelector((state) => state.channelsInfo);
    const state = useSelector(state => state);

    useEffect(() => {
        dispatch(getChannelsInfo());
        if(!localStorage.userToken) {
            navigate('/login');
            localStorage.removeItem('userToken');
        }
    }, [isAuth, dispatch]);

    console.log(channels)

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <ul>
                    <Channels/>
                </ul>
            </div>
        </Container>

    );
};

export default Chat;