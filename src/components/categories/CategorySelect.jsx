import { Form } from 'react-bootstrap';
import React from 'react';
import { useFetchCategories } from '../../hooks/useFetchCategories'

export const CategorySelect = (props) => {
    const categories = useFetchCategories();

    const handleChange = (event) => {
        props.setSelectedValue(event.target.value);
    }

    const renderOptions = () => {
        return categories?.map((c, i) => {
            return <option key={i} value={c?.name}>{c?.name}</option>
        })
    }

    return (
        <Form.Group controlId="categorySelect">
            <Form.Label>Select Category</Form.Label>
            <Form.Select value={props.selectedValue} onChange={handleChange}>
                {renderOptions()}
            </Form.Select>
        </Form.Group>
    )
};
