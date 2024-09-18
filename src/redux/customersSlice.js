import { createSlice } from '@reduxjs/toolkit';

const customersSlice = createSlice({
  name: 'customers-slice',
  initialState: {
    customers: [
      {
        id: '0',
        firstName: 'Hadas',
        lastName: 'Dasdas',
        email: 'Hadas@Dasdas.com',
      },
      {
        id: '1',
        firstName: 'Josef',
        lastName: 'Yoyo',
        email: 'Josef@Yoyo.com',
      },
      {
        id: '2',
        firstName: 'Hila',
        lastName: 'luli',
        email: 'Hila@luli.com',
      },
    ],
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(user => user.id !== action.payload);
    },
  },
});

export const { addCustomer: addCustomer, removeCustomer: removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;
