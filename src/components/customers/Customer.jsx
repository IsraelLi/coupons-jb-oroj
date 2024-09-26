import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../coupons/Coupon.css'
import { deleteCustomerById } from '../../services/server-api/customers-handle'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeCustomer } from '../../redux/customersSlice';


const Customer = ({ customer }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fullName = `${customer.firstName} ${customer.lastName}`

  function handleDelete() {
    deleteCustomerById(customer.id).then(res => {
      dispatch(removeCustomer(customer.id))
      toast.success(`Customer: ${customer.id} was deleted successfully!`);
    }).catch(e => {
      toast.error(`Fail to delete customer id: ${customer.id}.`);
    })

    handleClose();
  }

  function handleDisplayCustomerCoupons() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='card'>
      <Button variant="outline-primary" onClick={handleShow}>
        {fullName}
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>first name:</strong> {customer?.firstName}</p>
          <p><strong>last name:</strong> {customer?.lastName}</p>
          <p><strong>email:</strong> {customer?.email}</p>
        </Modal.Body>

        <Modal.Footer>
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

export default Customer;
