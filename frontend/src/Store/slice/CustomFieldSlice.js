import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customfieldtag: "",
    customfieldselector: '',
    customfieldDesc:''
}

const customFieldSlice = createSlice({
    name: 'customFieldSlice',
    initialState,
    reducers: {
        setCustomFieldSlice: (state, action) => {
            const {value,type}=action.payload;
            switch(type){
                case 'customFieldTagname':
                   state.customfieldtag=value
                   break;
                case 'customFieldType':
                    state.customfieldselector=value
                    break;
                case 'customFieldDescription':
                    state.customfieldDesc = value
                    break;
            }
        }
    },
});


export const { setCustomFieldSlice } = customFieldSlice.actions
export default customFieldSlice.reducer