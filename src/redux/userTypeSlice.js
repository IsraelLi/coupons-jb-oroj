import { createSlice } from '@reduxjs/toolkit';


const userTypeSlice = createSlice({
  name: 'user',
  initialState: {
    userType: null
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    initUserType: (state) => {
      state.userType = null;
    },
  },
});

export const { setUserType: setUserType, initUserType: initUserType } = userTypeSlice.actions;
export default userTypeSlice.reducer;
