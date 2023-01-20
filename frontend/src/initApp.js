import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { actions as channelsActions } from './store/channelsSlice';
import { actions as messagesActions } from './store/messagesSlice';
import store from './store/index.js';
import App from './App.jsx';
import resources from './locales/index.js';
import { ApiContext } from './contexts';

const initApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const { dispatch } = store;
  const socket = io();
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

  const addMessage = (message) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newMessage', message, (err, response) => {
      if (err) {
        reject();
        return;
      }
      resolve(response);
    });
  });
  const addChannel = (channel, cb) => {
    socket.timeout(5000).emit('newChannel', channel, cb);
  };
  const renameChannel = (channel, cb) => {
    socket.timeout(5000).emit('renameChannel', channel, cb);
  };
  const removeChannel = (id, cb) => {
    socket.timeout(5000).emit('removeChannel', id, cb);
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'ru',
      resources,
    });
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };
  root.render(
    <React.StrictMode>
      <RollBarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ApiContext.Provider value={{
            addMessage,
            addChannel,
            renameChannel,
            removeChannel,
          }}
          >
            <Provider store={store}>
              <I18nextProvider i18n={i18nextInstance}>
                <App />
              </I18nextProvider>
            </Provider>
          </ApiContext.Provider>
        </ErrorBoundary>
      </RollBarProvider>
    </React.StrictMode>,
  );
};

export default initApp;
