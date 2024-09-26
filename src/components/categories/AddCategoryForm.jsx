import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postCategory } from '../../services/server-api/category-handle'
import '../coupons/Coupon.css'


export function AddCategoryForm(props) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        postCategory(name);
        props.closeFormHandle();
    }

    const isSubmitDisabled = () => {
        return !(name && name !== '')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>

            <Button autoFocus={true} disabled={isSubmitDisabled()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => props.closeFormHandle()}>
                Cancel
            </Button>
        </Form>
    );
}