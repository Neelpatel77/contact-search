import React, { useState, useEffect } from "react";
import SearchForm from "./searchForm";
import ContactTable from "./ContactTable";
import data from "./data/contacts.json";
import { Box, Typography, Paper, Button } from "@mui/material";

const App = () => {
  const [filters, setFilters] = useState({});
  const [contacts, setContacts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [highlightedContactId, setHighlightedContactId] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    // When no search is applied and page loads, show all contacts initially
    setContacts(data);
  }, []);

  const handleSearch = () => {
    let filtered = data;

    if (filters.firstName) {
      const firstNameFilter = filters.firstName.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.firstName.toLowerCase().includes(firstNameFilter)
      );
    }

    if (filters.lastName) {
      const lastNameFilter = filters.lastName.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.lastName.toLowerCase().includes(lastNameFilter)
      );
    }

    if (filters.email) {
      const emailFilter = filters.email.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.email.toLowerCase().includes(emailFilter)
      );
    }

    if (filters.phone) {
      filtered = filtered.filter((contact) =>
        contact.phone.includes(filters.phone)
      );
    }

    if (filters.dateOfBirth) {
      const dobFilter = filters.dateOfBirth;
      filtered = filtered.filter((contact) =>
        contact.dateOfBirth.includes(dobFilter)
      );
    }

    if (filters.street) {
      const streetFilter = filters.street.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.address.toLowerCase().includes(streetFilter)
      );
    }

    if (filters.city) {
      const cityFilter = filters.city.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.city.toLowerCase().includes(cityFilter)
      );
    }

    if (filters.state) {
      const stateFilter = filters.state.toLowerCase();
      filtered = filtered.filter((contact) =>
        contact.state.toLowerCase().includes(stateFilter)
      );
    }

    if (filters.zipCode) {
      filtered = filtered.filter((contact) =>
        contact.zip.includes(filters.zipCode)
      );
    }

    setContacts(filtered);
  };

  const handleSelect = (contact) => {
    setSelectedContacts([contact]); // Ensure only one contact is selected at a time
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const paginatedContacts = contacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleContactClick = (contactId) => {
    setHighlightedContactId(
      highlightedContactId === contactId ? null : contactId
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Contact Search
      </Typography>
      <SearchForm filters={filters} setFilters={setFilters} />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Search
      </Button>

      <ContactTable
        contacts={paginatedContacts}
        onSelect={handleSelect}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={contacts.length}
        onPageChange={handlePageChange}
      />

      {/* Display Selected Contact Details */}
      {selectedContacts.length > 0 ? (
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">Selected Contacts:</Typography>
          {selectedContacts.map((contact) => (
            <div key={contact.id}>
              <Typography>
                <strong>Name:</strong> {contact.firstName} {contact.lastName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {contact.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {contact.phone}
              </Typography>
              <Typography>
                <strong>Address:</strong> {contact.address}, {contact.city}, {contact.state} - {contact.zip}
              </Typography>
              <hr />
            </div>
          ))}
        </Paper>
      ) : (
        <Typography variant="body1" style={{ marginTop: "16px" }}>
          No contacts selected.
        </Typography>
      )}
    </Box>
  );
};

export default App;
