import { useSelector } from 'react-redux';

import MessagesForm from './MessagesForm.jsx';
import MessagesHeader from './MessagesHeader.jsx';
import Message from './Message.jsx';

const Messages = () => {
    const channels = useSelector((state) => state.channelsInfo.channels);
    const messages = useSelector((state) => state.messagesInfo.messages);
    const currentChannelId = useSelector(
        (state) => state.channelsInfo.currentChannelId,
    );
    const [activeChannel] = channels.filter(
        ({ id }) => id === currentChannelId,
    );
    const messagesToShow = messages.filter((message) => message.channelId === activeChannel.id);
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <MessagesHeader
                    activeChannel={activeChannel}
                    messagesCount={messagesToShow.length}
                />
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                    {messagesToShow.map((message, i) => <Message message={message} key={i}/>)}
                </div>
                <MessagesForm activeChannel={activeChannel} />
            </div>
        </div>
    );
};

export default Messages;