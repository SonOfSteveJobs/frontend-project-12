import { useSelector } from 'react-redux';

import MessagesForm from './MessagesForm.jsx';
import MessagesHeader from './MessagesHeader.jsx';
import Message from './Message.jsx';

const Messages = () => {
    const channels = useSelector((s) => s.channelsInfo.channels);
    console.log('CHANNELS', channels)
    const currentChannelId = useSelector(
        (state) => state.channelsInfo.currentChannelId,
    );
    const [activeChannel] = channels.filter(
        ({ id }) => id === currentChannelId,
    );
    console.log('ACTIVE CHANNEL', activeChannel)
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <MessagesHeader
                    activeChannel={activeChannel}
                    messagesCount='0'
                />
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                    <Message message={{id:1, username: 'admin', text: 'hi'}} />
                </div>
                <MessagesForm activeChannel={activeChannel} />
            </div>
        </div>
    );
};

export default Messages;