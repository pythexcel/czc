import { createSlice } from '@reduxjs/toolkit';

const customFieldSlice = createSlice({
    name: 'custom',
    initialState: {
        customfieldData: [],
    },
    reducers: {
        setCustomFieldSlice: (state, action) => {
            const { index, customFieldTagname, customFieldType, customFieldDescription, allowCustomOverWright } = action.payload;

            state.customfieldData[index] = {
                ...state.customfieldData[index],
                customFieldTagname: customFieldTagname !== undefined ? customFieldTagname : state.customfieldData[index]?.customFieldTagname,
                customFieldType: customFieldType !== undefined ? customFieldType : state.customfieldData[index]?.customFieldType,
                customFieldDescription: customFieldDescription !== undefined ? customFieldDescription : state.customfieldData[index]?.customFieldDescription,
                allowCustomOverWright: allowCustomOverWright !== undefined ? allowCustomOverWright : false,
            };
        },
    },
});

export const { setCustomFieldSlice } = customFieldSlice.actions;
export default customFieldSlice.reducer;
