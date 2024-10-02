import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateCompany } from '../../services/server-api/company-handle'
import { useDispatch, useSelector } from 'react-redux';
import { editCompany } from '../../redux/companiesSlice';
import { setFormItem } from '../../redux/updateFormItemSlice';
import store from '../../redux/store';


function UpdateCompanyForm() {
    const formItem = useSelector(state => state.formItemStore.formItem);
    const [formData, setFormData] = useState(formItem);
    const dispatch = useDispatch();

    store.subscribe(() => {
        setFormData(store.getState().formItemStore)
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCompany(formData).then(res => {
            dispatch(editCompany(formData))
        });
        dispatch(setFormItem(null))
    };

    const isValidData = () => {
        return (formData.name && formData.name !== '' && formData.email && formData.email !== '' && formData.password !== '');
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
            <Button autoFocus={true} disabled={!isValidData()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => dispatch(setFormItem(null))}>
                Cancel
            </Button>
        </Form>
    );
}

export default UpdateCompanyForm;