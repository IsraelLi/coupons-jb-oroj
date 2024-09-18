import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Coupon.css'


const Coupon = ({ coupon}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    throw new Error('Function not implemented.');
  }


  return (
    <div className='card'>
      <Button variant="outline-primary" onClick={handleShow}>
        {coupon.title}
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{coupon?.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>description:</strong> {coupon?.description}</p>
          <p><strong>start date:</strong> {coupon?.startDate.toDateString()}</p>
          <p><strong>end date:</strong> {coupon?.endDate.toDateString()}</p>
          <p><strong>amount:</strong> {coupon?.amount}</p>
          <p><strong>price:</strong> {coupon?.price} ₪</p>
          <p><strong>category:</strong> {coupon?.categoryId}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
        
      </Modal>
    </div>
  );
}

export default Coupon;
