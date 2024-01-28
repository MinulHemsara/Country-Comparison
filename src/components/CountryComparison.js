import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountries,
  setCountryInfo,
  setError,
  setSelectedCountries,
} from "./countryComparisonSlice";
import "./site.css";

const CountryComparison = () => {
  const dispatch = useDispatch();
  const { countries, selectedCountries, countryInfo, error } = useSelector(
    (state) => state.countryComparison
  );

  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        dispatch(setCountries(response.data));
      } catch (error) {
        const errorMessage = "Error fetching country data";
        // dispatch(setError(errorMessage));
        alert(errorMessage);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCountrySelect = (country) => {
    dispatch(setError(null));
    // Select or deselect a country
    const newSelectedCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];

    dispatch(setSelectedCountries(newSelectedCountries));
  };

  const compareCountries = async () => {
    try {
      if (selectedCountries.length === 0) {
        // error message for if no country selected
        const msg = "Please select at least one country";
        // dispatch(setError("Please select at least one country"));
        alert(msg);
        return;
      }

      const promises = selectedCountries.map((countryCode) =>
        axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
      );

      const responses = await Promise.all(promises);
      const countryInfoData = responses.map((response) => response.data);

      // Check if any selected country was not found
      if (countryInfoData.some((info) => !info)) {
        dispatch(setError("One or more selected countries not found"));
        return;
      }

      dispatch(setCountryInfo(countryInfoData));
    } catch (error) {
      // Display the error message
      dispatch(setError("Failed to fetch country information"));
    }
  };
  return (
    <div class="container">
      <h2 class="title">Country Comparison</h2>
      <div class="comparison-container">
        <div id="country1">
          <label>Select Country 1: </label>
          <select onChange={(e) => handleCountrySelect(e.target.value)}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.alpha2Code} value={country.alpha2Code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div id="country2">
          <label>Select Country 2: </label>
          <select onChange={(e) => handleCountrySelect(e.target.value)}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.alpha2Code} value={country.alpha2Code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={compareCountries}>Compare</button>
      {error && <p class="error-message">{error}</p>}
      <div class="country-info-container">
        {countryInfo.map((info) => (
          <div key={info.alpha2Code} class="country-info">
            <img
              src={info.flags.svg}
              alt={`${info.name} Flag`}
              style={{ width: "50px", height: "auto" }}
            />
            <h3>{info.name}</h3>
            <p>Capital: {info.capital}</p>
            <p>Population: {info.population}</p>
            <p>Area: {info.area} sq km</p>
            <p>
              Languages: {info.languages.map((lang) => lang.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryComparison;
