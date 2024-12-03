import React, { useState } from "react";
import SearchForm from "./searchForm";
import ContactTable from "./ContactTable";
import data from "./data/contacts.json";
import { Box, Typography, Paper, Button } from "@mui/material";

const App = () => {
  const [filters, setFilters] = useState({});
  const [contacts, setContacts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);

  const itemsPerPage = 5;

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
    if (filters.email)
      filtered = filtered.filter(contact =>
        contact.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    if (filters.phone)
      filtered = filtered.filter(contact =>
        contact.phone.includes(filters.phone)
      );
    if (filters.dateOfBirth)
      filtered = filtered.filter(contact =>
        contact.dateOfBirth.includes(filters.dateOfBirth)
      );
    if (filters.street)
      filtered = filtered.filter(contact =>
        contact.address.toLowerCase().includes(filters.street.toLowerCase())
      );
    if (filters.city)
      filtered = filtered.filter(contact =>
        contact.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    if (filters.state)
      filtered = filtered.filter(contact =>
        contact.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    if (filters.zipCode)
      filtered = filtered.filter(contact =>
        contact.zipCode.includes(filters.zipCode)
      );
    setContacts(filtered);
  };

  const handleSelect = (contact) => setSelectedContact(contact);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const paginatedContacts = contacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        style={{ marginBottom: "20px" }}
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
      {selectedContact && (
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h6">Selected Contact:</Typography>
          <Typography>
            <strong>Name:</strong> {selectedContact.firstName}{" "}
            {selectedContact.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedContact.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {selectedContact.phone}
          </Typography>
          <Typography>
            <strong>Address:</strong> {selectedContact.address}, {selectedContact.city}, {selectedContact.state} - {selectedContact.zipCode}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default App;
