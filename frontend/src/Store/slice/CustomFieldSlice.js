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
        deleteCustomField: (state, action) => {
            const newCustomField = state.customfieldData.filter((item, i) => i !== action.payload)
            state.customfieldData = newCustomField
        },
        resetCustomField: (state) => {
            state.customfieldData = []
        }
    },
});

export const { setCustomFieldSlice, deleteCustomField, resetCustomField } = customFieldSlice.actions;
export default customFieldSlice.reducer;
