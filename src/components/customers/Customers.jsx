import React, { useState } from "react"
import Customer from './Customer';
import { useFetchCustomers } from '../../hooks/useFetchCustomers';
import AddCustomerForm from './AddCustomerForm';
import PluseButton from '../basic/PlusButton'


export const Customers = () => {
    const [addForm, setAddForm] = useState(false)
    const customers = useFetchCustomers();

    return (
        <div className="coupons-container">
            {!addForm && customers?.map((c, i) => {
                return c?.firstName != '' ? <Customer key={i} customer={c} /> : null
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCustomerForm closeFormHandle={() => setAddForm(false)} />}
        </div>
    )
}