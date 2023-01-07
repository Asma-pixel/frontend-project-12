import { Provider } from 'react-redux';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import { actions as channelsActions } from './store/channelsSlice';
import { actions as messagesActions } from './store/messagesSlice';
import store from './store/index.js';
import App from './App.jsx';
import resources from './locales/index.js';

const initApp = async (socket) => {
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
  return (
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <App socket={socket} />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollBarProvider>
  );
};

export default initApp;
