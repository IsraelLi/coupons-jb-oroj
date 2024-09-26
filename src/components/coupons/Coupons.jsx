import React, { useState } from "react"
import Coupon from './Coupon';
import './Coupons.css';
import {useFetchCoupons} from '../../hooks/useFetchCoupons';
import PluseButton from '../basic/PlusButton';
import AddCouponForm from './AddCouponForm';


export const Coupons = () => {
    const [addForm, setAddForm] = useState(false)       

    const coupons = useFetchCoupons();

    return (
        <div className="coupons-container">
            {coupons.map((c, i) => {
                return <Coupon key={i} coupon={c} />
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCouponForm closeFormHandle={() => setAddForm(false)} />}
        </div>
    )
}