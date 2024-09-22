import React from "react"
import Company from './Company';
import { useSelector } from "react-redux";


export const Companies = () => {

    const companies = useSelector(state => state.companies.companies);

    return (
        <div className="coupons-container">
            {companies.map((c, i) => {
                return <Company key={i} company={c} />
            })}
            Companies displaing and actions - for admin only

        </div>
    )
}