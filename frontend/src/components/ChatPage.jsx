import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
const ChatPage = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, logOut } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(fetchData(user)).unwrap();
    } catch (e) {
      rollbar.error(e);
      if (e.statusCode === 401) logOut();
      else toast.error(t('generalErrors.unknown'));
    }
    setLoading(false);
  }, [dispatch, user, rollbar, logOut, t]);

  useEffect(() => {
    getData();
  }, [getData]);
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
