import { createSlice } from '@reduxjs/toolkit';


const init = {
  categories: []
}


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: init,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
});

export const { setCategories, addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
