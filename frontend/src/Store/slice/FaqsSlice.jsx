import { createSlice } from '@reduxjs/toolkit';

const FaqsSlice = createSlice({
    name: 'FaqsAccess',
    initialState: { permission: '' },
    reducers: {
        setFaqs: (state, action) => {
            state.permission = action.payload;
        },
        resetFaqs: (state) => {
            state.permission = ''; 
        },
    }, 
});

export const { setFaqs, resetFaqs  } = FaqsSlice.actions;
export const selectFaqs = (state) => state.FaqsAccess.permission;
export default FaqsSlice.reducer;
