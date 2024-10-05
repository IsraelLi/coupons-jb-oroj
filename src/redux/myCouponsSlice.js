import { createSlice } from '@reduxjs/toolkit';


const myCouponsSlice = createSlice({
  name: 'my-coupons-slice',
  initialState: {
    coupons: [],
  },
  reducers: {
    setMyCoupons: (state, action) => {
      state.coupons = action.payload;
    }
  },
});

export const { setMyCoupons } = myCouponsSlice.actions;
export default myCouponsSlice.reducer;
