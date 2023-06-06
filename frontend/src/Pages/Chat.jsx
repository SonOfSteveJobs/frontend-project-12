import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../Components/context';

const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);

    useEffect(() => {
        if(!localStorage.userId) {
            setIsAuth(false);
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