import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import fetchData from '../store/fetchData.js';
import Channels from './Channels.jsx';
import MesagesBox from './MessagesBox.jsx';

const Chat = () => {
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  console.log(currentChannelId);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channelId={currentChannelId} />
        <MesagesBox channelId={currentChannelId} />
      </div>
    </div>
  );
};

const ChatRoutes = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    try {
      await dispatch(fetchData());
    } finally {
      setLoading(false);
    }
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

export default ChatRoutes;
