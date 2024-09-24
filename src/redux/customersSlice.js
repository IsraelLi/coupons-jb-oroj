import { createSlice } from '@reduxjs/toolkit';

 
  const mockCustomers = [
    {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  ]

const customersSlice = createSlice({
  name: 'customers-slice',
  initialState: mockCustomers,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(user => user.id !== action.payload);
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;
