import { createSlice } from '@reduxjs/toolkit';


const init = {
  customers: []
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
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
    editCustomer: (state, action) => {
      const index = state.customers.findIndex(customer => customer.id === action.payload.id);
      
      if (index !== -1) {
        state.customers[index] = { ...state[index], ...action.payload };
      }
    }
  },
});

export const { setCustomers, addCustomer, removeCustomer, editCustomer } = customersSlice.actions;
export default customersSlice.reducer;
