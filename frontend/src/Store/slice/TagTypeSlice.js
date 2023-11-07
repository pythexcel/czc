import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Tagname: "",
    textArea:'',
}

const TagTypeSlice = createSlice({
    name: 'Tagname',
    initialState,
    reducers: {
        setTagname: (state, action) => {
            console.log('statestate',state,action)
            const {value,type}=action.payload;
            switch(type){
                case 'name':
                   state.Tagname=value
                   break;
                case 'textarea':
                    state.textArea=value
                    break;    
            }
        }
    },
});


export const { setTagname } = TagTypeSlice.actions
export default TagTypeSlice.reducer