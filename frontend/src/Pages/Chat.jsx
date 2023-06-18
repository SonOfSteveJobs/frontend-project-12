import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getChatInfo} from '../store/channelsSlice';
import {Container} from 'react-bootstrap';
import Channels from '../Components/chat/Channels/Channels';
import Messages from '../Components/chat/messages/Messages';
import {useAuth} from '../hooks/useAuth';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, removeToken, isLoading} = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            dispatch(getChatInfo())
            if (!isAuth) {
                navigate('/login');
                removeToken();
            }
        }
    }, [isAuth, dispatch, navigate, removeToken, isLoading]);

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
