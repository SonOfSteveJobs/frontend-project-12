import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context';
import { useDispatch, useSelector } from 'react-redux';
import {getChatInfo} from '../store/channelsSlice';
import {Container} from 'react-bootstrap';
import Channels from '../Components/chat/Channels';
import Messages from '../Components/chat/messages/Messages';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatInfo());
        if(!localStorage.userToken) {
            navigate('/login');
            localStorage.removeItem('userToken');
        }
    }, [isAuth, dispatch]);

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <Channels/>
                <Messages/>
            </div>
        </Container>

    );
};

export default Chat;