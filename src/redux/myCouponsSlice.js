import { createSlice } from '@reduxjs/toolkit';


const myCouponsSlice = createSlice({
  name: 'my-coupons-slice',
  initialState: {
    coupons: [],
  },
  reducers: {
    setMyCoupons: (state, action) => {
      state.coupons = action.payload;
    }, addMyCoupon: (state, action) => {
      state.coupons.push(action.payload);
    },
    removeMyCoupon: (state, action) => {
      state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
    }
  },
});

export const { setMyCoupons, removeMyCoupon, addMyCoupon } = myCouponsSlice.actions;
export default myCouponsSlice.reducer;
