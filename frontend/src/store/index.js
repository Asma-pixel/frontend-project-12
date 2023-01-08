import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';
import 'react-bootstrap/dist/react-bootstrap';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    modalsReducer,
  },
});
