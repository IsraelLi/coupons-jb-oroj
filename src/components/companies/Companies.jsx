import React, { useState } from "react"
import Company from './Company';
import PluseButton from '../basic/PlusButton'
import { useFetchCompanies } from '../../hooks/useFetchCompanies';
import AddCompanyForm from './AddCompanyForm';
import '../coupons/Coupon.css'


export const Companies = () => {
    const [addForm, setAddForm] = useState(false)
    const companies = useFetchCompanies();


    return (
        <div className="coupons-container">
            {!addForm && companies?.map((c, i) => {
                return c?.name !=='' ? <Company key={i} company={c} /> : null;
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCompanyForm closeFormHandle={() => setAddForm(false)} />}
        </div>
    )
}