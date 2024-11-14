import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations); // Update suggestions when allLocations changes
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredLocations = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
