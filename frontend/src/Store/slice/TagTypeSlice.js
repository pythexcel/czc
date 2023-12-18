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
    deleteTagType: (state, action) => {
      const newTagType = state.childData.filter((item, i) => i !== action.payload)
      state.childData = newTagType
    },
    resetTagState: (state) => {
      state.childData = [];
    },
  },
});

export const { updateChildData, resetTagState, deleteTagType } = TagTypeSlice.actions;
export default TagTypeSlice.reducer;
