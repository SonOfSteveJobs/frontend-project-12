import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../Components/context';

const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth);

    useEffect(() => {
        if(!localStorage.userId) {
            navigate('/login');
            localStorage.removeItem('userId');
        }
    }, [isAuth]);

    return (
        <div>
            chat page
        </div>
    );
};

export default Chat;