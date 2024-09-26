import { configureStore } from '@reduxjs/toolkit';
import couponsReducer from './couponsSlice';
import customersReducer from './customersSlice';
import companiesReducer from './companiesSlice';
import userTypeReducer from './userTypeSlice';
import categoriesReducer from './categoriesSlice';



const store = configureStore({
  reducer: {
    couponsStore: couponsReducer,
    customersStore: customersReducer,
    companiesStore: companiesReducer,
    categoriesStore: categoriesReducer,
    userStore: userTypeReducer
  },
});

export default store;
