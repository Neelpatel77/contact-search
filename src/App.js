import React, { useState } from "react";
import SearchForm from "./searchForm";
import ContactTable from "./ContactTable";
import data from "./data/contacts.json";
import { Box, Typography, Paper, Button, IconButton, InputAdornment } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarToday } from "@mui/icons-material";

const App = () => {
  const [filters, setFilters] = useState({});
  const [contacts, setContacts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);

  const itemsPerPage = 5;

  const handleDateChange = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateOfBirth: date,
    }));
  };

  const handleSearch = () => {
    let filtered = data;
    if (filters.firstName)
      filtered = filtered.filter((contact) =>
        contact.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase())
      );
    if (filters.lastName)
      filtered = filtered.filter((contact) =>
        contact.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    if (filters.email)
      filtered = filtered.filter((contact) =>
        contact.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    if (filters.phone)
      filtered = filtered.filter((contact) =>
        contact.phone.includes(filters.phone)
      );
    if (filters.dateOfBirth)
      filtered = filtered.filter((contact) =>
        contact.dateOfBirth.includes(filters.dateOfBirth)
      );
    if (filters.street)
      filtered = filtered.filter((contact) =>
        contact.address.toLowerCase().includes(filters.street.toLowerCase())
      );
    if (filters.city)
      filtered = filtered.filter((contact) =>
        contact.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    if (filters.state)
      filtered = filtered.filter((contact) =>
        contact.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    if (filters.zipCode)
      filtered = filtered.filter((contact) =>
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
      
      {/* Date of Birth Input Field with Calendar Icon */}
      <Box mt={2}>
        <Typography variant="h6">Date of Birth:</Typography>
        <Box display="flex" alignItems="center">
          <DatePicker
            selected={filters.dateOfBirth || null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date (yyyy-mm-dd)"
            style={{ width: "80%", padding: "8px", marginRight: "8px" }}
          />
          <IconButton onClick={() => {}}>
            <CalendarToday />
          </IconButton>
        </Box>
      </Box>

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
            <strong>Address:</strong> {selectedContact.address},{" "}
            {selectedContact.city}, {selectedContact.state} -{" "}
            {selectedContact.zipCode}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default App;
