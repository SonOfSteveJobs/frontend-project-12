import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context';
import axios from 'axios';
import getAuthHeader from '../API/getAuthHeader';
import getChatData from '../API/getChatData';
import { useDispatch, useSelector } from 'react-redux';
import {getChannelsInfo} from '../store/channelsSlice';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [response, setResponse] = useState({});
    const authHeader = getAuthHeader();
    const dispatch = useDispatch();
    const channelsInfo = useSelector((state) => state.channelsInfo);
    const state = useSelector(state => state)

    useEffect(() => {
        dispatch(getChannelsInfo());
    }, [])

    useEffect(() => {
        if(!localStorage.userToken) {
            navigate('/login');
            localStorage.removeItem('userToken');
        }
    }, [isAuth]);

    return (
        <div>
            chat page
        </div>
    );
};

export default Chat;