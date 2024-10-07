import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postCoupon } from '../../services/server-api/coupons-handle'
import { ComboSelect } from '../basic/ComboSelect';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../../redux/couponsSlice'
import { addMyCoupon } from '../../redux/myCouponsSlice';


function AddCouponForm(props) {
    const [formData, setFormData] = useState({});
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.company)
            handleCompanyChange(props.company);
    }, [props.company])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target?.name]: e.target?.value });
    };

    const handleCategoryChange = (categoryName) => {
        setFormData({ ...formData, ['categoryId']: props.categories.find(cat => cat.name === categoryName).id });
        setCategory(categoryName)
    }

    const handleCompanyChange = (companyName) => {
        setFormData({ ...formData, ['companyId']: props.companies.find(c => c.name === companyName).id });
        setCompany(companyName)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postCoupon(formData).then(res => {
            props.company
                ? dispatch(addMyCoupon(res))
                : dispatch(addCoupon(res))
        });
        props.closeFormHandle();
    };

    const isValidData = () => {
        return formData.title && formData.title !== ''
            && formData.description && formData.description !== ''
            && formData.startDate && formData.startDate !== ''
            && formData.endDate && formData.endDate !== ''
            && formData.amount && formData.amount !== ''
            && formData.price && formData.price !== ''
            && formData.categoryId && formData.companyId
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title ?? ''}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    value={formData.description ?? ''}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter image file name"
                    name="image"
                    value={formData.image ?? ''}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    type="Date"
                    placeholder="Enter Start Date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    type="Date"
                    placeholder="Enter End Date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </Form.Group>

            <ComboSelect header={'Category'} items={props.categories} selectedValue={category} setSelectedValue={e => handleCategoryChange(e)} />
            {props.company === undefined &&
                <ComboSelect header={'Company'} items={props.companies} selectedValue={company} setSelectedValue={e => handleCompanyChange(e)}
                />}

            <Button autoFocus={true} disabled={!isValidData()} variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" type="button" onClick={() => props.closeFormHandle()}>
                Cancel
            </Button>
        </Form>
    );
}

export default AddCouponForm;