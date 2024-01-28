import { createSlice } from "@reduxjs/toolkit";

// Creating a Redux slice for managing country comparison state
export const countryComparisonSlice = createSlice({
  name: "countryComparison", // The name of the slice
  initialState: {
    countries: [], // store all available countries
    selectedCountries: [], //  store user-selected countries for comparison
    countryInfo: [], // store detailed information about selected countries
    error: null, // Error
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setSelectedCountries: (state, action) => {
      state.selectedCountries = action.payload;
    },

    setCountryInfo: (state, action) => {
      state.countryInfo = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCountries, setSelectedCountries, setCountryInfo, setError } =
  countryComparisonSlice.actions;

export default countryComparisonSlice.reducer;
