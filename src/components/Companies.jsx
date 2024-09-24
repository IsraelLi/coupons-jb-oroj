import React, { useState } from "react"
import Company from './Company';
import PluseButton from './basic/PlusButton'
import AddCompanyForm from './AddCompanyForm';
import { useFetchCompanies } from '../hooks/useFetchCompanies';



export const Companies = () => {
    const [addForm, setAddForm] = useState(false)
    const companies = useFetchCompanies();

    
    return (
        <div className="coupons-container">
            {!addForm && companies?.companies?.map((c, i) => {
                return <Company key={i} company={c} />
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCompanyForm onSubmit={() => setAddForm(false)} />}
        </div>
    )
}