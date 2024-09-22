import React from "react"
import { useSelector } from "react-redux";
import Customer from './Customer';


export const Customers = () => {

    const customers = useSelector(state => state.customers.customers);

    return (
        <div className="coupons-container">
            {customers.map((c, i) => {
                return <Customer key={i} customer={c} />
            })}
            Customers displaing and actions.
            The actions supposed to change according to the user type.
        </div>
    )
}