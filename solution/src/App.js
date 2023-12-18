import React, { useState, useEffect } from "react";
import { isNameValid, getLocations } from "./mock-api/apis";
import "./App.css";
import { AppContext } from "./context/AppContext";
import Contacts from "./components/Contacts";
import AddContactForm from "./components/AddContactForm";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [locations, setLocations] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false);

  // On initial load the app will fetch the locations from the API for the dropdown and fetch the contacts from local storage for the table.
  // Errors will be logged to the console
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocations();

        setLocations(data);

        const contactsFromLocalStorage = localStorage.getItem("Contacts");
        if (contactsFromLocalStorage === null) {
          setContacts([]);
          localStorage.setItem("Contacts", []);
        } else setContacts(JSON.parse(contactsFromLocalStorage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        location,
        setLocation,
        locations,
        setLocations,
        contacts,
        setContacts,
        errorMessage,
        setErrorMessage,
      }}
    >
      <div className="App">
        <AddContactForm />
        <Contacts />
      </div>
    </AppContext.Provider>
  );
}

export default App;
