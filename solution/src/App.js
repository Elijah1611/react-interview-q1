import React, { useState, useEffect } from 'react';
import './App.css';
import { isNameValid, getLocations } from './mock-api/apis'

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const localStroageMock = [
    { name: "Jack", location: "USA" },
    { name: "Billy", location: "Canada" },
    { name: "Lucy", location: "China" },
    { name: "Jane", location: "Brazil" },
    { name: "Rachel", location: "USA" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await isNameValid(name);
        if(response === false) setErrorMessage(true)

        const data = await getLocations();
        setLocations(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name]);

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
          <button type='button' className='ContactButton'>Clear</button>
          <button className='ContactButton'>Add</button>
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
                localStroageMock.map((contact) => (
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
