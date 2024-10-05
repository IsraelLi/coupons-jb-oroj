import React, { useState } from "react"
import Category from './Category';
import '../coupons/Coupon.css'
import PluseButton from '../basic/PlusButton'
import { AddCategoryForm } from './AddCategoryForm'
import { useFetchCategories } from '../../hooks/useFetchCategories'
import { useSelector } from 'react-redux';
import { UpdateCategoryForm } from "./UpdateCategoryForm";


export const Categories = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const categories = useFetchCategories();
    const updateFormItem = useSelector(state => state.formItemStore.formItem);
    const userType = localStorage.getItem('userType');

    return (
        <div className="coupons-container">
            {!showAddForm && !updateFormItem && categories?.map((c, i) => {
                return c && c?.name !== '' ? <Category key={i} category={c} /> : null
            })}
            {userType === 'Admin' && !showAddForm && <PluseButton onClick={() => setShowAddForm(true)} />}
            {showAddForm && <AddCategoryForm closeFormHandle={() => setShowAddForm(false)} />}
            {updateFormItem && <UpdateCategoryForm />}
        </div>
    )
}