import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export default createAsyncThunk(
  'channelsInfo/SetInitialState',
  async ({ token }, { rejectWithValue }) => {
    try {
      const header = { Authorization: `Bearer ${token}` };
      const response = await axios.get(routes.dataPath(), { headers: header });
      return {
        currentChannelId: response.data.currentChannelId,
        channels: response.data.channels,
        messages: response.data.messages,
      };
    } catch (e) {
      if (!e.isAxiosError) throw e;
      return rejectWithValue(e.response.data);
    }

    // return { currentChannelId:
    // response.data.currentChannelId, channels: response.data.channels };
  },
);
