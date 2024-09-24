import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Coupon.css'
import { purchaseCoupons, deleteCoupons } from '../../services/server-api/coupons-handle'

const Coupon = ({ coupon }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    deleteCoupons(coupon.id);
  }

  function handlePurchase() {
    purchaseCoupons(coupon.id)
  }

  function dateFormat(stringDate) {
    const obj = new Date(stringDate);
    return obj.toLocaleString()
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
          <p><strong>start date:</strong> {dateFormat(coupon?.startDate)}</p>
          <p><strong>end date:</strong> {dateFormat(coupon?.endDate)}</p>
          <p><strong>amount:</strong> {coupon?.amount}</p>
          <p><strong>price:</strong> {coupon?.price} ₪</p>
          <p><strong>category:</strong> {coupon?.categoryId}</p>
        </Modal.Body>

        <Modal.Footer>
          {true && <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>}
          {true && <Button variant="secondary" onClick={handlePurchase}>
            Purchase
          </Button>}
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default Coupon;
