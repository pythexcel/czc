
import { createSlice } from '@reduxjs/toolkit';

const flagSlice = createSlice({
    name: 'flag',
    initialState: { value: false },
    reducers: {
        setFlag: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setFlag } = flagSlice.actions;
export const selectFlag = (state) => state.flag.value;
export default flagSlice.reducer;
