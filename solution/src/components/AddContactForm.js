import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AddContactForm() {
  const {
    name,
    setName,
    location,
    setLocation,
    locations,
    setLocations,
    errorMessage,
    setErrorMessage,
  } = useContext(AppContext);

  // This function handles updating the state for the Name input field
  // It will uppercase the first letter of the name for the table
  // It also clears the error validation when the input changes
  const handleNameChange = (e) => {
    const n = e.target.value;
    const nameFormatted = n.charAt(0).toUpperCase() + n.slice(1);
    setName(nameFormatted);
    if (errorMessage === true) setErrorMessage(false);
  };

  // This function handles updating the state for the Location select dropdown input field
  // Also clears the error validation when the input changes
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (errorMessage === true) setErrorMessage(false);
  };

  return (
    <form>
      <div className="FormGroup">
        <div className="FormLabel">
          <label htmlFor="name">Name:</label>
        </div>

        <div className="FormField">
          {/* Used the search type for the clear button */}
          <input
            type="search"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
          <p
            className={`FormFieldValidationError ${
              errorMessage ? "hide" : "show"
            }`}
          >
            This name has already been taken
          </p>
        </div>
      </div>

      <div className="FormGroup">
        <div className="FormLabel">
          <label htmlFor="location">Location:</label>
        </div>

        <div className="FormField">
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
