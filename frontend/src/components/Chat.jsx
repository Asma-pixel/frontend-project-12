import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/index.jsx';
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
  const auth = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        await dispatch(fetchData());
        auth.logIn();
      }
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
        <Spinner animation="grow" size="lg" style={{ width: '7rem', height: '7rem' }} className="justify-self-center lg" />
      </div>
    );
  }
  return (
    auth.loggedIn ? <Chat /> : <Navigate to="/login" state={{ from: location }} />
  );
};

export default ChatRoutes;
