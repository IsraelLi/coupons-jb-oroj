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
    editCategory: (state, action) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);

      if (index !== -1) {
        state.categories[index] = { ...state[index], ...action.payload };
      }
    }
  },
});

export const { setCategories, addCategory, removeCategory, editCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
