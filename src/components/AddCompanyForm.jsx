import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {postCompany} from '../services/server-api/company-handle'
function AddCompanyForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postCompany(formData);
        props.onSubmit();
    };

    const isSubmitDisabled = () => {
        return !(formData.name && formData.name !== '' && formData.email && formData.email !== '' && formData.password !== '');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button disabled={isSubmitDisabled()} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddCompanyForm;