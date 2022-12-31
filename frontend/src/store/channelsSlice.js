import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        const temp = state;
        temp.currentChannelId = payload.currentChannelId;
      });
  },
});
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
