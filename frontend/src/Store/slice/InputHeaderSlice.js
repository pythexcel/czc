import { createSlice } from "@reduxjs/toolkit";

const inputHeaderSlice = createSlice({
    name: 'inputHeader',
    initialState: {
        inputHeaderData:[],
    },
    reducers: {
        setInputHeaderSlice: (state, action) => {
            const { index, headername, valueOfHeader } = action.payload;

            state.inputHeaderData[index] = {
                ...state.inputHeaderData[index],
                headername: headername !== undefined ? headername : state.inputHeaderData[index]?.headername,
                valueOfHeader,
            }
        }
    }
})

export const { setInputHeaderSlice } = inputHeaderSlice.actions;
export default inputHeaderSlice.reducer;
