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
      state.type = payload.type;
      state.channel = payload.channel || null;
    },
    closeModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});
export const { actions } = modalsSlice;
export default modalsSlice.reducer;
