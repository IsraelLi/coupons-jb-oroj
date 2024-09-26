import { createSlice } from '@reduxjs/toolkit';


const init = {
  coupons: [
    {
      id: '0',
      companyId: '0',
      title: "BlackFriday",
      description: 'some desc.....',
      startDate: new Date("2024-09-16T10:30:00Z").toISOString(),
      endDate: new Date("2024-09-17T10:30:00Z").toISOString(),
      amount: 10,
      price: 99
    }
  ],
};


const couponsSlice = createSlice({
  name: 'coupons-slice',
  initialState: init,
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
