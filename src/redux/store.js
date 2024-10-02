import { configureStore } from '@reduxjs/toolkit';
import couponsReducer from './couponsSlice';
import customersReducer from './customersSlice';
import companiesReducer from './companiesSlice';
// import userTypeReducer from './userTypeSlice';
import categoriesReducer from './categoriesSlice';
import formItemReducer from './updateFormItemSlice'


const store = configureStore({
  reducer: {
    couponsStore: couponsReducer,
    customersStore: customersReducer,
    companiesStore: companiesReducer,
    categoriesStore: categoriesReducer,
    formItemStore: formItemReducer
    // userStore: userTypeReducer
  },
});

export default store;
