import React, {
  useEffect,
  useRef,
} from 'react';
import {
  Button,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPlusSquare } from 'react-icons/bs';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { openModal } from '../../../store/modalSlice';
import ModalWindow from '../modals/ModalWindow';
import Channel from './Channel';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();
  const channelsScroll = useRef(null);

  useEffect(() => {
    channelsScroll.current?.lastElementChild?.scrollIntoView();
  }, [channels.length]);

  return (
    <>
      <ModalWindow />
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <Button
            variant="light"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => dispatch(openModal({ name: 'addChannel' }))}
          >
            <BsPlusSquare size={20} />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav
          defaultActiveKey="#general"
          className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          as="ul"
          ref={channelsScroll}
        >
          {channels.map((channel) => (
            <Channel channel={channel} key={channel.id} />
          ))}
        </Nav>
      </div>
    </>
  );
};

export default Channels;
