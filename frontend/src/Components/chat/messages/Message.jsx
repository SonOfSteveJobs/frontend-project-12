import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

const Message = ({ message }) => {
  const { id, username, body } = message;
  const { getToken } = useAuth();
  const currentUser = (JSON.parse(getToken())).username;
  const additionalText = currentUser === username ? ' (you) ' : ' ';
  return (
    <div className="text-break mb-2" key={id}>
      <b>{username}</b>
      {additionalText}
      :
      {' '}
      {body}
    </div>
  );
};

export default Message;
