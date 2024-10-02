import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setFormItem } from '../../redux/updateFormItemSlice'
import { deleteCompanyById } from '../../services/server-api/company-handle'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeCompany } from '../../redux/companiesSlice'


const Company = ({ company }) => {
  const [showCard, setShowCard] = useState(false);
  const dispatch = useDispatch();


  function handleDelete() {
    deleteCompanyById(company.id).then(res => {
      toast.success(`Company: ${company.id} was deleted successfully!`);
      dispatch(removeCompany(company.id))
    }).catch(e => {
      toast.error(`Fail to delete company id: ${company.id}.`);
    })
  }

  function handleEdit() {
    dispatch(setFormItem(company))
    setShowCard(false)
  }

  function handleDisplayCustomerCoupons() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='card'>
      <Button className='card-btn' variant="outline-primary" onClick={() => setShowCard(true)}>
        {company.name}
      </Button>

      <Modal show={showCard} onHide={() => setShowCard(false)}>

        <Modal.Header closeButton>
          <Modal.Title>{company.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>name:</strong> {company?.name}</p>
          <p><strong>email:</strong> {company?.email}</p>
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

export default Company;
