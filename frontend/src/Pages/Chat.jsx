import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../Components/context';
import axios from 'axios';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const getAuthHeader = () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        return userToken && userToken.token ? { Authorization: `Bearer ${userToken.token}` } : {};
    }
    const authHeader = getAuthHeader();
    console.log(authHeader);

    const [data, setData] = useState({});
    const getChatData = async (authHeader) => {
        const response = await axios.get(('/api/v1/data'), {headers: authHeader});
        setData(response)
    };

    useEffect(() => {
        getChatData(authHeader);
    }, [])

    console.log(data);

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