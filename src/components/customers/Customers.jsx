import React, { useState } from "react"
import Customer from './Customer';
import { useFetchCustomers } from '../../hooks/useFetchCustomers';
import AddCustomerForm from './AddCustomerForm';
import PluseButton from '../basic/PlusButton'
import { useSelector } from 'react-redux';
import UpdateCustomerForm from "./UpdateCustomerForm";

export const Customers = () => {
    const [addForm, setAddForm] = useState(false)
    const customers = useFetchCustomers();
    const updateFormItem = useSelector(state => state.formItemStore.formItem);
    const userType = localStorage.getItem('userType');

    return (
        <div className="coupons-container">
            {!addForm && !updateFormItem && customers?.customers?.map((c, i) => {
                return c !== null ? <Customer key={i} customer={c} /> : null
            })}
            {userType === 'Admin' && !addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCustomerForm closeFormHandle={() => setAddForm(false)} />}
            {updateFormItem && <UpdateCustomerForm />}
        </div>
    )
}