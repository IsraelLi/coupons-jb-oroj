import React, { useState } from "react"
import Coupon from './Coupon';
import './Coupons.css';
import { useFetchMyCoupons } from '../../hooks/useFetchMyCoupons';
import { useFetchCategories } from '../../hooks/useFetchCategories'
import { useFetchCompanies } from '../../hooks/useFetchCompanies'
import PluseButton from '../basic/PlusButton';
import AddCouponForm from './AddCouponForm';
import { useSelector } from 'react-redux';
import UpdateCouponForm from "./UpdateCouponForm";

export const MyCoupons = () => {
    const [addForm, setAddForm] = useState(false)
    const categories = useFetchCategories();
    const coupons = useFetchMyCoupons();
    const companies = useFetchCompanies();
    const updateFormItem = useSelector(state => state.formItemStore.formItem);
    const userType = localStorage.getItem('userType')

    const getCompanyName = () => {
        // return the company name or undefined if it's not a company
        return userType === 'Company' ? localStorage.getItem('userEmail').split('@')[0] : undefined
    }

    return (
        <div className="coupons-container">
            {!addForm && !updateFormItem && coupons.map((c, i) => {
                return c && c?.title !== '' ? <Coupon key={i} coupon={c} /> : null
            })}
            {userType !== 'Customer' && !addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCouponForm company={getCompanyName()} closeFormHandle={() => setAddForm(false)} companies={companies} categories={categories} />}
            {updateFormItem && <UpdateCouponForm />}

        </div>
    )
}