import axios from 'axios';


const URL = '/customers';

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
        const response = await axios.get(`${URL}/by${couponId}`, { val });
        return response.data;
    } catch (error) {
        throw error;
    }
};