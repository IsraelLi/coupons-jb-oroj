import { createSlice } from '@reduxjs/toolkit';

const mockCompanies = {
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
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState: mockCompanies,
  reducers: {
    setCompanies: (state, action) => {
      if (action?.payload != null)
        state.companies = action.payload
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    removeCompany: (state, action) => {
      state.companies = state.companies.filter(company => company.id !== action.payload);
    },
  },
});

export const { setCompanies, addCompany, removeCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
