
import { createSlice } from '@reduxjs/toolkit';

const MngeSlice = createSlice({
    name: 'ManageFlag',
    initialState: { value: false },
    reducers: {
        setManage: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setManage } = MngeSlice.actions;
export const selectMange = (state) => state.ManageFlag.value;
export default MngeSlice.reducer;
