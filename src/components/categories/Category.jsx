import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../coupons/Coupon.css'
import { deleteCategoryById } from '../../services/server-api/category-handle'
import { useDispatch } from 'react-redux';
import { removeCategory } from '../../redux/categoriesSlice'
import { setFormItem } from '../../redux/updateFormItemSlice'


const Category = ({ category }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(setFormItem(category))
    setShow(false)
  }

  function handleDelete() {
    deleteCategoryById(category.id).then(res => {
      dispatch(removeCategory(category.id))
    })
  }

  function handleDisplayCustomerCoupons() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='card'>
      <Button className='card-btn' variant="outline-primary" onClick={() => setShow(true)}>
        {category?.name}
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>

        <Modal.Header closeButton>
          <Modal.Title>{category?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Name:</strong> {category?.name}</p>
          <p><strong>ID:</strong> {category?.id}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleDisplayCustomerCoupons}>
            Show my coupons
          </Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default Category;
