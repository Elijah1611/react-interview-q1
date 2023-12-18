import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis'
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [locations, setLocations] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false);

  // The Clear button will be disabled if the list is empty and enabled if the list has at least 1 contact.
  const isClearButtonDisabled = () => {
    if (contacts.length === 0) return true
    else return false
  }

  // The Add button will be disabled if the name and location does not pass validation or is empty
  const isAddButtonDisabled = () => {
    if (name.length === 0 || errorMessage === true || location.length === 0) return true
    else return false
  }

  // handles updating the state for the Name input field
  // Also clears the error validation when the input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errorMessage === true) setErrorMessage(false)
  };

  // handles updating the state for the Location select dropdown input field
  // Also clears the error validation when the input changes
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (errorMessage === true) setErrorMessage(false)
  };  
  
  // This method adds the contact to the the contact table.
  // It will also check to see if the name is valid according the the API implementation and if it is present in local storage.
  // Validation will pass if the same name exist but the location is different.
  // If the validation fails, it will show the validation error on the form (name input field)
  // If the validation passes, it will add the contact to state and local storage and reset the form
  const handleAddContact = async () => {
    const isNameValidResults = await isNameValid(name);
    const contactsFromLS = localStorage.getItem('Contacts') === '' ? [] : JSON.parse(localStorage.getItem('Contacts'));
    const isNameTaken = contactsFromLS.find(contacts => contacts.name === name && contacts.location === location);

    if (isNameValidResults === false || isNameTaken) {
      setErrorMessage(true)
      return
    }
    else setErrorMessage(false)

    contacts.push({ name, location });

    localStorage.setItem('Contacts', JSON.stringify(contacts));

    setName('')
    setLocation('')
  };

  // Clears the contacts in state and local storage
  const handleClearContacts = () => {
    setContacts([]);
    localStorage.setItem('Contacts', []);
  }

  // On initial load the app will fetch the locations from the API for the dropdown and fetch the contacts from local storage for the table.
  // Errors will be logged to the console
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocations();

        setLocations(data); 

        const contactsFromLocalStorage = localStorage.getItem('Contacts');

        if (contactsFromLocalStorage === null) setContacts([]);
        else setContacts(JSON.parse(contactsFromLocalStorage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <form>
        <div className='FormGroup'>
          <div className='FormLabel'>
            <label htmlFor="name">Name:</label>
          </div>

          <div className='FormField'>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              />
              <p className={`FormFieldValidationError ${errorMessage ? 'hide' : 'show'}`}>This name has already been taken</p>
          </div>
        </div>

        <div className='FormGroup'>
          <div className='FormLabel'>
            <label htmlFor="location">Location:</label>
          </div>

          <div className='FormField'>
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

      <div className='Contacts'>
        <div className='ContactControls'>
          <button type='button' className='ContactButton' onClick={handleClearContacts} disabled={isClearButtonDisabled()}>Clear</button>
          <button className='ContactButton' onClick={handleAddContact} disabled={isAddButtonDisabled()}>Add</button>
        </div>

        <table className='ContactTable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                contacts.length > 0 && contacts.map((contact) => (
                  <tr>
                    <td>{contact.name}</td>
                    <td>{contact.location}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
