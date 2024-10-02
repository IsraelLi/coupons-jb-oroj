import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateCustomer } from '../../services/server-api/customers-handle'
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer } from '../../redux/customersSlice'
import store from '../../redux/store';
import { setFormItem } from '../../redux/updateFormItemSlice';


function UpdateCustomerForm() {
    const formItem = useSelector(state => state.formItemStore.formItem);
    const [formData, setFormData] = useState(formItem);
    const dispatch = useDispatch();

    store.subscribe(() => {
        setFormData(store.getState().formItemStore.formItem)
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateCustomer(formData).then(res => {
            dispatch(editCustomer(formData))
        });
        dispatch(setFormItem(null))
    }

    const isValidData = () => {
        return formData.firstName && formData.firstName !== ''
            && formData.lastName && formData.lastName !== ''
            && formData.email && formData.email !== ''
            && formData.password !== '';
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
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
            <Button autoFocus={true} disabled={!isValidData()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => dispatch(setFormItem(null))}>
                Cancel
            </Button>
        </Form>
    );
}

export default UpdateCustomerForm;