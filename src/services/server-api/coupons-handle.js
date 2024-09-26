import axios from 'axios';
import { toast } from 'react-toastify';

const URL = '/adminApi/coupons';

export const getAllCoupons = async () => {
    console.log('getAllCoupons');
    
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postCoupon = async (coupon) => {

    console.table(coupon)
    try {
        const response = await axios.post(URL, couponPostBody(coupon));
        toast.success("New coupon was added successfully!");
        return response.data;
    } catch (error) {
        toast.error("Fail to create a new coupon.");
        throw error;
    }
};

export const purchaseCoupons = async (couponId) => {
    try {
        const response = await axios.put(`${URL}/${couponId}}`, {});
        toast.success("Purchase coupon was successful!");
        return response.data;
    } catch (error) {
        toast.error("Fail to purchase coupon.");
        throw error;
    }
};

export const deleteCoupon = async (couponId) => {
    try {
        const response = await axios.delete(`${URL}/${couponId}`, {});
        toast.success("Delete coupon was successful!");
        return response.data;
    } catch (error) {
        toast.error("Fail to delete coupon.");
        throw error;
    }
};

function couponPostBody(coupon) {
    return {
        title: coupon.title,
        description: coupon.description,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        amount: coupon.amount,
        price: coupon.price,
        categoryId: coupon.categoryId
    }
}