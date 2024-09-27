import React, { useState } from "react"
import Coupon from './Coupon';
import './Coupons.css';
import { useFetchCoupons } from '../../hooks/useFetchCoupons';
import { useFetchCategories } from '../../hooks/useFetchCategories'
import { useFetchCompanies } from '../../hooks/useFetchCompanies'
import PluseButton from '../basic/PlusButton';
import AddCouponForm from './AddCouponForm';


export const Coupons = () => {
    const [addForm, setAddForm] = useState(false)
    const categories = useFetchCategories();
    const coupons = useFetchCoupons();
    const companies = useFetchCompanies();

    return (
        <div className="coupons-container">
            {!addForm && coupons.map((c, i) => {
                return <Coupon key={i} coupon={c} />
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCouponForm closeFormHandle={() => setAddForm(false)} companies={companies} categories={categories} />}
        </div>
    )
}