import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postCategory } from '../../services/server-api/category-handle'
import '../coupons/Coupon.css'
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/categoriesSlice'

export function AddCategoryForm(props) {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        postCategory(name).then(res => {
            dispatch(addCategory(res))
        });
        props.closeFormHandle();
    }

    const isValidData = () => {
        return name && name !== ''
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

            <Button autoFocus={true} disabled={!isValidData()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => props.closeFormHandle()}>
                Cancel
            </Button>
        </Form>
    );
}