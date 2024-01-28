import { configureStore } from "@reduxjs/toolkit";
import countryComparisonReducer from "./countryComparisonSlice";

const store = configureStore({
  reducer: {
    countryComparison: countryComparisonReducer,
  },
});

export default store;
