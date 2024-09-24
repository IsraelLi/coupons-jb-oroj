import { createSlice } from '@reduxjs/toolkit';


const init = {
  customers: [
    {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  ]
}

const customersSlice = createSlice({
  name: 'customers-slice',
  initialState: init,
  reducers: {
    setCustomers: (state, action) => {
      if (action?.payload != null)
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
