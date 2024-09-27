import { createSlice } from '@reduxjs/toolkit';


const couponsSlice = createSlice({
  name: 'coupons-slice',
  initialState: {
    coupons: [],
  },
  reducers: {
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    addCoupon: (state, action) => {
      state.coupons.push(action.payload);
    },
    removeCoupon: (state, action) => {
      state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
    },
  },
});

export const { setCoupons, addCoupon, removeCoupon } = couponsSlice.actions;
export default couponsSlice.reducer;
