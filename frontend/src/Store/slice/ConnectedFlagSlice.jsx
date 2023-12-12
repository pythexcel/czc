
import { createSlice } from '@reduxjs/toolkit';

const ConnectedFlagSlice = createSlice({
    name: 'connect',
    initialState: { value: false },
    reducers: {
        setConnect: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setConnect } = ConnectedFlagSlice.actions;
export const selectConnet = (state) => state.connect.value;
export default ConnectedFlagSlice.reducer;



