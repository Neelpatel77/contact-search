import React, { useState } from "react";
import SearchForm from "./searchForm";
import ContactTable from "./ContactTable";
import SearchForm from "./searchForm";
import data from "./data/contacts.json";


const App = () => {
  const [filters, setFilters] = useState({});
  const [contacts, setContacts] = useState(data);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSearch = () => {
    let filtered = data;
    if (filters.firstName)
      filtered = filtered.filter(contact =>
        contact.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    if (filters.lastName)
      filtered = filtered.filter(contact =>
        contact.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    // Add other filters similarly
    setContacts(filtered);
  };

  const handleSelect = (contact) => setSelectedContact(contact);

  return (
    <div>
      <SearchForm filters={filters} setFilters={setFilters} />
      <button onClick={handleSearch}>Search</button>
      <ContactTable contacts={contacts} onSelect={handleSelect} />
      {selectedContact && (
        <div>
          <h3>Selected Contact:</h3>
          <p>Name: {selectedContact.firstName} {selectedContact.lastName}</p>
          <p>Email: {selectedContact.email}</p>
          <p>Phone: {selectedContact.phone}</p>
          <p>Address: {selectedContact.address}</p>
        </div>
      )}
    </div>
  );
};

export default App;
