import { createSlice } from '@reduxjs/toolkit';


const companiesSlice = createSlice({
  name: 'companies-slice',
  initialState: {
    companies: [
      {
        id: '0',
        name: 'Amazon',
        email: 'alexa@Amazonas.com',
      },
      {
        id: '1',
        name: 'Apple',
        email: 'mac@donald.com',
      },
      {
        id: '2',
        name: 'Google',
        email: 'hi@google.com',
      },
    ],
  },
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    removeCompany: (state, action) => {
      state.companies = state.companies.filter(company => company.id !== action.payload);
    },
  },
});

export const { addCompany: addCompany, removeCompany: removeCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
