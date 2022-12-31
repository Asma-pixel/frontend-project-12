import { useSelector } from 'react-redux';
import { selectors } from '../store/messagesSlice';
import MessagesForm from './MessagesForm';
import { selectors as channelSelectors } from '../store/channelsSlice';

const Message = ({ author, text }) => (
  <div className="text-break mb-2">
    <b>{author}</b>
    {`: ${text}`}
  </div>
);
const MesagesBox = ({ channelId }) => {
  const messages = useSelector(selectors.selectAll);
  const currentChannel = useSelector((state) => channelSelectors
    .selectById(state, channelId));
  const currentMessages = messages.filter((message) => message.channelId === channelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {currentMessages.length}
            {' '}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {currentMessages.map((message) => (
            <Message
              author={message.username}
              text={message.body}
              key={message.id}
            />
          ))}
        </div>
        <MessagesForm />
      </div>
    </div>
  );
};
export default MesagesBox;
