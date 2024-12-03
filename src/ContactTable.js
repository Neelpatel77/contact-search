import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Pagination,
} from "@mui/material";

const ContactTable = ({ contacts, onSelect, totalItems, onPageChange, currentPage, itemsPerPage }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Zip Code</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index} onClick={() => onSelect(contact)} hover>
              <TableCell>
                {contact.firstName} {contact.lastName}
              </TableCell>
              <TableCell>{contact.dateOfBirth}</TableCell>
              <TableCell>{contact.address}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell>{contact.state}</TableCell>
              <TableCell>{contact.zipCode}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={onPageChange}
        style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}
      />
    </TableContainer>
  );
};

export default ContactTable;
