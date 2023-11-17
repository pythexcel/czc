import { createSlice } from '@reduxjs/toolkit';

const TagTypeSlice = createSlice({
  name: 'tag',
  initialState: {
    childData: [],
  },
  reducers: {
    updateChildData: (state, action) => {
      const { index, tagname, description } = action.payload;
      state.childData[index] = {
        ...state.childData[index],
        tagname: tagname !== undefined ? tagname : state.childData[index]?.tagname,
        description,
      };
    },
  },
});

export const { updateChildData } = TagTypeSlice.actions;
export default TagTypeSlice.reducer;
