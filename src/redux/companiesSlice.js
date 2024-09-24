import { createSlice } from '@reduxjs/toolkit';


const init = {
  companies: [
    {
      id: '',
      name: '',
      email: '',
    }
  ]
}


const companiesSlice = createSlice({
  name: 'companies',
  initialState: init,
  reducers: {
    setCompanies: (state, action) => {
      if (action?.payload != null)
        state.companies = action.payload;
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
