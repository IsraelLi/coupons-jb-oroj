import React, { useState } from "react"
import Company from './Company';
import PluseButton from '../basic/PlusButton'
import { useFetchCompanies } from '../../hooks/useFetchCompanies';
import AddCompanyForm from './AddCompanyForm';
import '../coupons/Coupon.css'
import UpdateCompanyForm from './UpdateCompanyForm';
import { useSelector } from 'react-redux';


export const Companies = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const companies = useFetchCompanies();
    const updateFormItem = useSelector(state => state.formItemStore.formItem);

    return (
        <div className="coupons-container">
            {!showAddForm  && !updateFormItem && companies?.map((c, i) => {
                return c && c?.name !== '' ? <Company key={i} company={c} /> : null;
            })}
            {!showAddForm && <PluseButton onClick={() => setShowAddForm(true)} />}
            {showAddForm && <AddCompanyForm closeFormHandle={() => setShowAddForm(false)} />}
            {updateFormItem && <UpdateCompanyForm />}
        </div>
    )
}