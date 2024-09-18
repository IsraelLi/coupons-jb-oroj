import { createSlice } from '@reduxjs/toolkit';



const couponsSlice = createSlice({
  name: 'coupons-slice',
  initialState: {
    coupons: [
      {
        id: '0',
        companyId: '0',
        title: "BlackFriday",
        description: 'some desc.....',
        startDate: new Date("2024-09-16T10:30:00Z"),
        endDate: new Date("2024-09-17T10:30:00Z"),
        amount: 10,
        price: 99
      },
      {
        id: '1',
        companyId: '0',
        title: "RedFriday",
        description: 'some desc.....',
        startDate: new Date("2024-10-16T10:30:00Z"),
        endDate: new Date("2024-10-17T10:30:00Z"),
        amount: 10,
        price: 10
      },
      {
        id: '2',
        companyId: '0',
        title: "BlackSunday",
        description: 'some desc.....',
        startDate: new Date("2024-09-10T10:00:00Z"),
        endDate: new Date("2024-09-28T10:00:00Z"),
        amount: 10,
        price: 50
      },

    ],
  },
  reducers: {
    addCoupon: (state, action) => {
      state.coupons.push(action.payload);
    },
    removeCoupon: (state, action) => {
      state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
    },
  },
});

export const { addCoupon, removeCoupon } = couponsSlice.actions;
export default couponsSlice.reducer;
