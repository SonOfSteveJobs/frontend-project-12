import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getChatInfo} from '../store/channelsSlice';
import {Container} from 'react-bootstrap';
import Channels from '../Components/chat/Channels/Channels';
import Messages from '../Components/chat/messages/Messages';
import {useAuth} from '../hooks/useAuth';
import Loader from '../Components/UI/Loader';


const Chat = () => {
    const navigate = useNavigate();
    const {isAuth, removeToken, isLoading} = useAuth();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.channelsInfo);

    useEffect(() => {
        if (!isLoading) {
            dispatch(getChatInfo())
            if (!isAuth) {
                navigate('/login');
                removeToken();
            }
        }
    }, [isAuth, dispatch, navigate, removeToken, isLoading]);

    if (loading) {
        return <div style={{position: 'absolute', top: '50%', left: '50%'}}><Loader /></div>;
    } else {
        return (
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <Channels/>
                    <Messages/>
                </div>
            </Container>
        );
    }
};

export default Chat;
