import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateCategory } from '../../services/server-api/category-handle'
import '../coupons/Coupon.css'
import { useDispatch, useSelector } from 'react-redux';
import { editCategory } from '../../redux/categoriesSlice'
import store from '../../redux/store';
import { setFormItem } from '../../redux/updateFormItemSlice';

export function UpdateCategoryForm() {
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

        updateCategory(formData).then(res => {
            dispatch(editCategory(formData))
        });
        dispatch(setFormItem(null))
    }

    const isValidData = () => {
        return formData.name && formData.name !== ''
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

            <Button autoFocus={true} disabled={!isValidData()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => dispatch(setFormItem(null))}>
                Cancel
            </Button>
        </Form>
    );
}