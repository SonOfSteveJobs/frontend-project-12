import React from 'react';

const Message = ({ message }) => {
  const { id, username, body } = message;
  const currentUser = (JSON.parse(localStorage.getItem('userToken'))).username;
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
