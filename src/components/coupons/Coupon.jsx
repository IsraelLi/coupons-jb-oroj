import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setFormItem } from '../../redux/updateFormItemSlice'
import { purchaseCoupons, deleteCoupon } from '../../services/server-api/coupons-handle'
import { useDispatch } from 'react-redux';
import { removeCoupon } from '../../redux/couponsSlice'

const Coupon = ({ coupon }) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  function handleDelete() {
    deleteCoupon(coupon.id).then(res => {
      dispatch(removeCoupon(coupon.id))
    })
  }

  function handleEdit() {
    dispatch(setFormItem(coupon))
    setShow(false)
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
      <Button className='card-btn' variant="outline-primary" onClick={() => setShow(true)}>
        {coupon.title}
        {<Card.Img src={coupon?.image} />}

      </Button>

      <Modal show={show} onHide={() => setShow(false)}>

        <Modal.Header closeButton>
          <Modal.Title>{coupon?.title}</Modal.Title>
        </Modal.Header>


        <Card>
          <Card.Body>
            <Card.Img variant="top" src={coupon?.image} />

            <Card.Text> {coupon?.description} </Card.Text>
            <Card.Text> <strong>start date:</strong> {dateFormat(coupon?.startDate)} </Card.Text>
            <Card.Text><strong>end date:</strong> {dateFormat(coupon?.endDate)}</Card.Text>
            <Card.Text><strong>amount:</strong> {coupon?.amount}</Card.Text>
            <Card.Text><strong>price:</strong> {coupon?.price} ₪</Card.Text>
            <Card.Text><strong>category ID:</strong> {coupon?.categoryId}</Card.Text>
            <Card.Text><strong>company ID:</strong> {coupon?.companyId}</Card.Text>
          </Card.Body>
        </Card>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handlePurchase}>
            Purchase
          </Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default Coupon;
