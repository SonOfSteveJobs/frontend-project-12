import React from 'react';

const MessagesHeader = ({activeChannel, messagesCount}) => {
    return(
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
                <b># {activeChannel ? activeChannel.name : ''}</b>
            </p>
            <span className="text-muted">
      {messagesCount} сообщений
    </span>
        </div>
)};

export default MessagesHeader;