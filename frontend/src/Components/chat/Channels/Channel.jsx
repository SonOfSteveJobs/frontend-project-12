import React from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { changeCurrent } from '../../../store/channelsSlice';
import { openModal } from '../../../store/modalSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  if (channel.removable === false) {
    return (
      <Nav.Item key={channel.id} className="w-100" as="li">
        <Button
          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start"
          onClick={() => dispatch(changeCurrent(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </Nav.Item>
    );
  }
  return (
    <Nav.Item key={channel.id} className="w-100" as="li">
      <Dropdown className="d-flex btn-group" as={ButtonGroup}>
        <Button
          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(changeCurrent(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle
          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          className="flex-grow-0 dropdown-toggle-split"
        >
          <span className="visually-hidden">{t('channels.channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(openModal({ name: 'removeChannel', id: channel.id }))}>
            {t('channels.delete')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(openModal({ name: 'renameChannel', id: channel.id }))}>
            {t('channels.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
