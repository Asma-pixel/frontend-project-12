import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import fetchData from '../store/fetchData.js';
import Channels from './Channels.jsx';
import MesagesBox from './MessagesBox.jsx';
import { useAuth } from '../hooks/index.jsx';

const Chat = () => {
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channelId={currentChannelId} />
        <MesagesBox channelId={currentChannelId} />
      </div>
    </div>
  );
};
const a = (b) => b.help();
const ChatPage = () => {
  a('a');
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    await dispatch(fetchData(user));
    setLoading(false);
  };
  useEffect(() => {
    getData();
  });
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} className="justify-self-center lg" />
      </div>
    );
  }

  return (
    <Chat />
  );
};

export default ChatPage;
