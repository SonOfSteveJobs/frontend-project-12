import { t } from 'i18next';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Channels from '../Components/chat/Channels/Channels';
import Messages from '../Components/chat/messages/Messages';
import Loader from '../Components/UI/Loader';
import { useAuth } from '../hooks/useAuth';
import { getChatInfo } from '../store/channelsSlice';

const Chat = () => {
  const navigate = useNavigate();
  const { isAuth, removeToken, isLoading } = useAuth();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.channelsInfo);

  useEffect(() => {
    if (!isLoading) {
      try {
        dispatch(getChatInfo());
      } catch (e) {
        toast.error(t('notifications.аuthError'));
        console.error(e);
      }
      if (!isAuth) {
        navigate('/login');
        removeToken();
      }
    }
  }, [isAuth, dispatch, navigate, removeToken, isLoading]);

  if (loading) {
    return <div style={{ position: 'absolute', top: '50%', left: '50%' }}><Loader /></div>;
  }
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </Container>
  );
};

export default Chat;
