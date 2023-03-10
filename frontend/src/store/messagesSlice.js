import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';
import { actions as channelActions } from './channelsSlice.js';

const { removeChannel } = channelActions;

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload.messages);
      })
      .addCase(removeChannel, (state, { payload }) => {
        const messages = Object.values(state.entities);
        const newMessages = messages.filter(({ channelId }) => payload !== channelId);
        messagesAdapter.setAll(state, newMessages);
      });
  },
});
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
