import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export default createAsyncThunk(
  'channelsInfo/SetInitialState',
  async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const header = { Authorization: `Bearer ${user.token}` };
    const response = await axios.get(routes.dataPath(), { headers: header });
    // return { currentChannelId:
    // response.data.currentChannelId, channels: response.data.channels };
    return {
      currentChannelId: response.data.currentChannelId,
      channels: response.data.channels,
      messages: response.data.messages,
    };
  },
);
