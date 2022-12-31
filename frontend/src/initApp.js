import { Provider } from 'react-redux';
import { actions as channelsActions } from './store/channelsSlice';
import { actions as messagesActions } from './store/messagesSlice';
import store from './store/index.js';
import App from './App.jsx';

const initApp = (socket) => {
  const { dispatch } = store;
  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(channelsActions.renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  return (
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  );
};

export default initApp;
