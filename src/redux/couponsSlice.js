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
    editCoupon: (state, action) => {
      const index = state.coupons.findIndex(coupon => coupon.id === action.payload.id);

      if (index !== -1) {
        state.coupons[index] = { ...state[index], ...action.payload };
      }
    }
  },
});

export const { setCoupons, addCoupon, removeCoupon, editCoupon } = couponsSlice.actions;
export default couponsSlice.reducer;
