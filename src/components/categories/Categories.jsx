import React, { useState } from "react"
import Category from './Category';
import '../coupons/Coupon.css'
import PluseButton from '../basic/PlusButton'
import { AddCategoryForm } from './AddCategoryForm'
import { useFetchCategories } from '../../hooks/useFetchCategories'


export const Categories = () => {
    const [addForm, setAddForm] = useState(false);
    const categories = useFetchCategories();

    return (
        <div className="coupons-container">
            {!addForm && categories?.map((c, i) => {
                return c && c?.name !== '' ? <Category key={i} category={c} /> : null
            })}
            {!addForm && <PluseButton onClick={() => setAddForm(true)} />}
            {addForm && <AddCategoryForm closeFormHandle={() => setAddForm(false)} />}
        </div>
    )
}