import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../coupons/Coupon.css'
import { deleteCategoryById } from '../../services/server-api/category-handle'
import { useDispatch } from 'react-redux';
import { removeCategory } from '../../redux/categoriesSlice'


const Category = ({ category }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();


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
      <Button className='card-btn' variant="outline-primary" onClick={()=>setShow(true)}>
        {category?.name}
      </Button>

      <Modal show={show} onHide={()=>setShow(false)}>

        <Modal.Header closeButton>
          <Modal.Title>{category?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Name:</strong> {category?.name}</p>
          <p><strong>ID:</strong> {category?.id}</p>
        </Modal.Body>

        <Modal.Footer>
          {true && <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>}
          {true && <Button variant="secondary" onClick={handleDisplayCustomerCoupons}>
            Show my coupons
          </Button>}
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default Category;
