import { createSlice } from '@reduxjs/toolkit';

const CreUserFlagSlice = createSlice({
  name: 'userRefresh',
  initialState: { value: false },
  reducers: {
    setCreUserFlag: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCreUserFlag } = CreUserFlagSlice.actions;
export const getCreUser = (state) => state.userRefresh.value;
export default CreUserFlagSlice.reducer;
