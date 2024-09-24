import axios from 'axios';


const URL = '/adminApi/customers';

/**
 * Enable for admin authorization only 
 * @returns all customers
 */
export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${URL}`);
        return response.data;
    } catch (error) {
        console.error(`Fail to get all customers.`, error);
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

export const postCustomer = async (customer) => {
    try {
        const response = await axios.post(`${URL}`, customerPostBody(customer));
        return response.data;
    } catch (error) {
        console.error(`Fail to post new customer.`, error);
    }
};

export const deleteCustomerById = async (id) => {
    try {
        const response = await axios.delete(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Fail to delete customer id: ${id}.`, error);
    }
};

function customerPostBody(customer) {
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        password: customer.password
    }
}