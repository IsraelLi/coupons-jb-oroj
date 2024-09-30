import { Form } from 'react-bootstrap';
import React from 'react';

export const ComboSelect = (props) => {

    const handleChange = (event) => {
        props.setSelectedValue(event.target.value);
    }

    const renderOptions = () => {
        return props.items?.map((c, i) => {
            return <option key={i} value={c?.name ? c.name : c?.title}>{c?.name}</option>
        })
    }

    return (
        <Form.Group controlId="selection">
            <Form.Label>{props.header}</Form.Label>
            <Form.Select value={props.selectedValue} onChange={handleChange}>
                <option value="">Select One...</option>
                {renderOptions()}
            </Form.Select>
        </Form.Group>
    )
};
