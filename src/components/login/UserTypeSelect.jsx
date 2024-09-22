import React from 'react';
import { Form } from 'react-bootstrap';

const UserTypeSelect = (props) => {

  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <Form.Group controlId="userTypeSelect">
      <Form.Label>Select User Type</Form.Label>
      <Form.Select value={props.value} onChange={handleChange}>
        <option value="">Choose...</option>
        <option value="Admin">Admin</option>
        <option value="Company">Company</option>
        <option value="Customer">Customer</option>
      </Form.Select>
    </Form.Group>
  );
};

export default UserTypeSelect;
