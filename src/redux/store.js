import { configureStore } from '@reduxjs/toolkit';
import couponsReducer from './couponsSlice';
import customersReducer from './customersSlice';
import companiesReducer from './companiesSlice';
import userTypeReducer from './userTypeSlice';


const store = configureStore({
  reducer: {
    coupons: couponsReducer,
    customers: customersReducer,
    companies: companiesReducer,
    userType: userTypeReducer
  },
});

export default store;
