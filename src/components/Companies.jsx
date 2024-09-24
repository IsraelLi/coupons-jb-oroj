import React, { useEffect, useState } from "react"
import Company from './Company';
import { useSelector } from "react-redux";
import PluseButton from './basic/PlusButton'
import AddCompanyForm from './AddCompanyForm';
import { useDispatch } from 'react-redux';
import { getCompanies } from '../services/server-api/company-handle';
import { setCompanies } from '../redux/companiesSlice'
import { toast } from 'react-toastify';


export const Companies = () => {
    const [addForm, setAddForm] = useState(false)
    const companies = useSelector(state => state.companies);
    const dispatch = useDispatch();

    useEffect(() => {
        getCompanies().then(res => {
            dispatch(setCompanies(res));
        }).catch(e => {
            toast.failed("Fail to get companies from the server.");
            console.error(e);
        });
    }, [dispatch])


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