import React from "react"
import { useSelector } from "react-redux";
import Coupon from './Coupon';
import './Coupons.css'


export const Coupons = () => {
    const coupons = useSelector(state => state.coupons.coupons);

    return (
        <div className="coupons-container">
            {coupons.map((c, i) => {
                return <Coupon key={i} coupon={c} />
            })}
            Coupons displaing and actions.
            The actions spposed to change according to the user type.
        </div>
    )
}