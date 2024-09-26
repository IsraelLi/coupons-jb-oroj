import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Coupon.css'
import { deleteCompanyById } from '../../services/server-api/company-handle'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeCompany } from '../../redux/companiesSlice'

const Company = ({ company }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete() {
    deleteCompanyById(company.id).then(res => {
      toast.success(`Company: ${company.id} was deleted successfully!`);
      dispatch(removeCompany(company.id))
      handleClose();
    }).catch(e => {
      toast.error(`Fail to delete company id: ${company.id}.`);
    })
  }

  function handleDisplayCustomerCoupons() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='card'>
      <Button variant="outline-primary" onClick={handleShow}>
        {company.name}
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{company.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>name:</strong> {company?.name}</p>
          <p><strong>email:</strong> {company?.email}</p>
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

export default Company;
