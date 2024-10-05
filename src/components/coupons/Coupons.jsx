import React, { useState } from "react"
import Coupon from './Coupon';
import './Coupons.css';
import { useFetchCoupons } from '../../hooks/useFetchCoupons';
import { useFetchCategories } from '../../hooks/useFetchCategories'
import { useFetchCompanies } from '../../hooks/useFetchCompanies'
import PluseButton from '../basic/PlusButton';
import AddCouponForm from './AddCouponForm';
import { useSelector } from 'react-redux';
import UpdateCouponForm from "./UpdateCouponForm";

export const Coupons = () => {
    const [addForm, setAddForm] = useState(false)
    const categories = useFetchCategories();
    const coupons = useFetchCoupons();
    const companies = useFetchCompanies();
    const updateFormItem = useSelector(state => state.formItemStore.formItem);
    const userType = localStorage.getItem('userType')


    return (
        <div className="coupons-container">
            {!addForm && !updateFormItem && coupons.map((c, i) => {
                return c && c?.title !== '' ? <Coupon key={i} coupon={c} /> : null
            })}
            {userType !== 'Customer' && !addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCouponForm closeFormHandle={() => setAddForm(false)} companies={companies} categories={categories} />}
            {updateFormItem && <UpdateCouponForm />}

        </div>
    )
}