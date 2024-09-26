import { createSlice } from '@reduxjs/toolkit';


const init = {
  categories: []
}


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: init,
  reducers: {
    setCategories: (state, action) => {

      if (action?.payload != null)
        action.payload.forEach(element => {
          state.categories.find(c => c.id === element.id) === undefined
            && state.categories.push(element);
        });
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
