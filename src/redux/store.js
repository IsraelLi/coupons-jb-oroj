import { configureStore } from '@reduxjs/toolkit';
import couponsReducer from './couponsSlice';
import customersReducer from './customersSlice';
import companiesReducer from './companiesSlice';
import userTypeReducer from './userTypeSlice';
import categoriesReducer from './categoriesSlice';



const store = configureStore({
  reducer: {
    coupons: couponsReducer,
    customers: customersReducer,
    companies: companiesReducer,
    categories: categoriesReducer,
    user: userTypeReducer
  },
});

export default store;
