import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channel: null,
};
const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const tempState = state;
      tempState.type = payload.type;
      tempState.channel = payload.channel || null;
    },
    closeModal: (state) => {
      const tempState = state;
      tempState.type = null;
      tempState.channel = null;
    },
  },
});
export const { actions } = modalsSlice;
export default modalsSlice.reducer;
