import { createSlice } from '@reduxjs/toolkit';

const AuditlogSlice = createSlice({
    name: 'AccessAuditlogs',
    initialState: { accessed: '' },
    reducers: {
        setAudit: (state, action) => {
            state.accessed = action.payload;
        },
    }, 
});

export const { setAudit } = AuditlogSlice.actions;
export const selectAuditlog = (state) => state.AccessAuditlogs.accessed;
export default AuditlogSlice.reducer;
