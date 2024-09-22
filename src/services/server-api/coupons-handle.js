import axios from 'axios';
import { toast } from 'react-toastify';

const URL = '/coupons';

export const getAllCoupons = async () => {
    try {
        const response = await axios.get(`${URL}`, {});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const purchaseCoupons = async (couponId) => {
    try {
        const response = await axios.put(`${URL}/${couponId}}`, {});
        toast.success("Purchase coupon was successful!");
        return response.data;
    } catch (error) {
        toast.failed("Fail to purchase coupon.");
        throw error;
    }
};

export const deleteCoupons = async (couponId) => {
    try {
        const response = await axios.delete(`${URL}`, {});
        toast.success("Delete coupon was successful!");
        return response.data;
    } catch (error) {
        toast.failed("Fail to delete coupon.");
        throw error;
    }
};