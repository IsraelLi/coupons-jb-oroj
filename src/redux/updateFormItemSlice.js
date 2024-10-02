import { createSlice } from '@reduxjs/toolkit';


const updateFormItemSlice = createSlice({
  name: 'form',
  initialState: {
    formItem: null
  },
  reducers: {
    setFormItem: (state, action) => {
      state.formItem = action.payload;
    }
  },
});

export const { setFormItem } = updateFormItemSlice.actions;
export default updateFormItemSlice.reducer;
