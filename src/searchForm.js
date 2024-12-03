import React from "react";
import { Box, TextField, Grid } from "@mui/material";

const SearchForm = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        {/* Left Column: Existing Filters */}
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
        </Grid>

        {/* Right Column: New Filters */}
        <Grid item xs={6}>
          <TextField
            label="Street"
            name="street"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            fullWidth
            onChange={handleInputChange}
            style={{ marginTop: "16px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchForm;
