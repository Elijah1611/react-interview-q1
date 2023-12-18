import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { isNameValid, getLocations } from "../mock-api/apis";

export default function Contacts() {
  const {
    contacts,
    setContacts,
    name,
    setName,
    location,
    setLocation,
    errorMessage,
    setErrorMessage,
  } = useContext(AppContext);

  // The Clear button will be disabled if the list is empty and enabled if the list has at least 1 contact.
  const isClearButtonDisabled = () => {
    if (contacts.length === 0) return true;
    else return false;
  };

  // The Add button will be disabled if the name and location does not pass validation or is empty
  const isAddButtonDisabled = () => {
    if (name.length === 0 || errorMessage === true || location.length === 0)
      return true;
    else return false;
  };

  // This function adds the contact to the the contact table.
  // It will also check to see if the name is valid according the the API implementation and if it is present in local storage.
  // Validation will pass if the same name exist but the location is different.
  // If the validation fails, it will show the validation error on the form (name input field)
  // If the validation passes, it will add the contact to state and local storage and reset the form
  const handleAddContact = async () => {
    if (localStorage.getItem("Contacts") === null)
      localStorage.setItem("Contacts", []);

    const isNameValidResults = await isNameValid(name);
    const contactsFromLS =
      localStorage.getItem("Contacts") === ""
        ? []
        : JSON.parse(localStorage.getItem("Contacts"));
    const isNameTaken = contactsFromLS.find(
      (contacts) => contacts.name === name && contacts.location === location
    );

    if (isNameValidResults === false || isNameTaken) {
      setErrorMessage(true);
      return;
    } else setErrorMessage(false);

    contacts.push({ name, location });

    localStorage.setItem("Contacts", JSON.stringify(contacts));

    setName("");
    setLocation("");
  };

  // Clears the contacts in state and local storage
  const handleClearContacts = () => {
    setContacts([]);
    localStorage.setItem("Contacts", []);
  };

  return (
    <div className="Contacts">
      <div className="ContactControls">
        <button
          type="button"
          className="ContactButton"
          onClick={handleClearContacts}
          disabled={isClearButtonDisabled()}
        >
          Clear
        </button>
        <button
          className="ContactButton"
          onClick={handleAddContact}
          disabled={isAddButtonDisabled()}
        >
          Add
        </button>
      </div>

      <table className="ContactTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 &&
            contacts.map((contact) => (
              <tr key={contact.name+contact.location}>
                <td>{contact.name}</td>
                <td>{contact.location}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
