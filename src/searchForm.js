import React from "react";

const SearchForm = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={filters.firstName || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={filters.lastName || ""}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        value={filters.dob || ""}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={filters.email || ""}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={filters.phone || ""}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
