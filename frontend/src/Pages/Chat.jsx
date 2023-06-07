import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../Components/context';
import axios from 'axios';
import getAuthHeader from '../API/getAuthHeader';
import getChatData from '../API/getChatData';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [response, setResponse] = useState({});
    const authHeader = getAuthHeader();

    useEffect(() => {
        getChatData(authHeader, setResponse);
    }, [])

    console.log(response);

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