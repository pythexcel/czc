import { createSlice } from '@reduxjs/toolkit';

const MngeSlice = createSlice({
    name: 'ManageFlag',
    initialState: { name: '' },
    reducers: {
        setManage: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { setManage } = MngeSlice.actions;
export const selectManage = (state) => state.ManageFlag.name;
export default MngeSlice.reducer;