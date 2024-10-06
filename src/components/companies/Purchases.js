import { useEffect, useState } from "react";
import { useFetchMyCoupons } from "../../hooks/useFetchMyCoupons";
import { Form } from 'react-bootstrap';
import Customer from "../customers/Customer";
import { getPurchases } from "../../services/server-api/coupons-handle";

export const Purchases = () => {
    const [coupon, setCoupon] = useState(null)
    const coupons = useFetchMyCoupons();
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        if (coupon != null)
            getPurchases(coupon.id).then(res => {
                console.table(res);

                setCustomers(res)
            })
    }, [coupon])

    const handleCouponChanged = (couponTitle) => {
        const selected = coupons.find(c => c.title === couponTitle)
        setCoupon(selected)
    }

    const renderOptions = () => {
        return coupons?.map((c, i) => {
            return <option key={i} value={c?.title}>{c?.title}</option>
        })
    }

    return (
        <div>
            <Form.Group controlId="selection">
                <Form.Label>Select Coupon</Form.Label>
                <Form.Select value={coupon?.title} onChange={e => handleCouponChanged(e.target.value)}>
                    <option value="">Select One...</option>
                    {renderOptions()}
                </Form.Select>
            </Form.Group>
            {coupon && customers?.map((c, i) => {
                return c !== null ? <Customer key={i} customer={c} /> : null
            })}
        </div>
    )
}