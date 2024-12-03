import React, { useState } from "react";
import SearchForm from "./searchForm";
import ContactTable from "./ContactTable";
import data from "./data/contacts.json";
import { Box, Typography, Paper, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [filters, setFilters] = useState({});
  const [contacts, setContacts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);

  const itemsPerPage = 5;

  // Handle Date Picker change
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
    if (filters.dateOfBirth) {
      filtered = filtered.filter((contact) =>
        contact.dateOfBirth.includes(filters.dateOfBirth)
      );
    }
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
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box flex={1}>
          <Typography variant="h6">First Name:</Typography>
          <input
            type="text"
            value={filters.firstName || ""}
            onChange={(e) =>
              setFilters({ ...filters, firstName: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
          <Typography variant="h6">Last Name:</Typography>
          <input
            type="text"
            value={filters.lastName || ""}
            onChange={(e) =>
              setFilters({ ...filters, lastName: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
          <Typography variant="h6">Email:</Typography>
          <input
            type="text"
            value={filters.email || ""}
            onChange={(e) =>
              setFilters({ ...filters, email: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
        </Box>
        <Box flex={1}>
          <Typography variant="h6">Date of Birth:</Typography>
          <DatePicker
            selected={filters.dateOfBirth || null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date"
            style={{
              width: "100%",
              padding: "8px",
              margin: "8px 0",
            }}
          />
          <Typography variant="h6">Street:</Typography>
          <input
            type="text"
            value={filters.street || ""}
            onChange={(e) =>
              setFilters({ ...filters, street: e.target.value })
            }
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
          <Typography variant="h6">City:</Typography>
          <input
            type="text"
            value={filters.city || ""}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
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
