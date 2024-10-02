import { createSlice } from '@reduxjs/toolkit';


const init = {
  companies: []
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
    editCompany: (state, action) => {
      const index = state.companies.findIndex(company => company.id === action.payload.id);

      if (index !== -1) {
        state.companies[index] = { ...state[index], ...action.payload };
      }
    }
  },
});

export const { setCompanies, addCompany, removeCompany, editCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
