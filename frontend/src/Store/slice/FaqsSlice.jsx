import { createSlice } from '@reduxjs/toolkit';

const FaqsSlice = createSlice({
    name: 'FaqsAccess',
    initialState: { permission: '' },
    reducers: {
        setFaqs: (state, action) => {
            state.permission = action.payload;
        },
    }, 
});

export const { setFaqs } = FaqsSlice.actions;
export const selectFaqs = (state) => state.FaqsAccess.permission;
export default FaqsSlice.reducer;
