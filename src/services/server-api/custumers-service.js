import axios from 'axios';
import BASE_URL from './baseAPI';

const URL = BASE_URL + '';

/**
 * Enable for admin authorization only 
 * @returns 
 */
export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${URL}`, {  });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCustomersByCouponId = async (couponId) => {
    const val = localStorage.getItem('token')
    
    try {
        const response = await axios.get(`${URL}/by-coupon${couponId}`, { val });
        return response.data;
    } catch (error) {
        throw error;
    }
};