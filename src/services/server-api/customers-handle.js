import axiosTokenWrapper from '../axiosTokenWrapper';
import { toast } from 'react-toastify';
import { getUrlByUserType } from '../urlByUserType';


const baseUrl = 'Api/customers';

/**
 * Enable for admin authorization only 
 * @returns all customers
 */
export const getAllCustomers = async () => {
    try {
        const response = await axiosTokenWrapper.get(getUrlByUserType(baseUrl));
        return response.data;
    } catch (error) {
        console.error(`Fail to get all customers.`, error);
    }
};

export const getCustomersByCouponId = async (couponId) => {
    const val = localStorage.getItem('token')

    try {
        const response = await axiosTokenWrapper.get(`${getUrlByUserType(baseUrl)}/by${couponId}`, { val });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postCustomer = async (customer) => {
    try {
        const response = await axiosTokenWrapper.post(getUrlByUserType(baseUrl), customerPostBody(customer), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.status >= 200 && response.status < 400)
            toast.success(`New customer: ${customer.id} was added successful!`);
        else
            toast.error(`Fail to post new customer: ${customer.id}. with error status: ${response.status}`);

        return response.data;
    } catch (error) {
        toast.success(`Fail to post new customer: ${customer.id}.`);
        console.error(`Fail to post new customer.`, error);
    }
};


export const updateCustomer = async (customer) => {
    try {
        const response = await axiosTokenWrapper.put(getUrlByUserType(baseUrl), companyUpdateBody(customer));
        toast.success(`Customer: ${customer.name} was updated successfully!`);
        return response.data;
    } catch (error) {
        toast.error(`Fail to update customer: ${customer.name}.`);
        console.error(`Fail to put the customer ${customer.id}.`, error);
    }
};


export const deleteCustomerById = async (id) => {
    try {
        const response = await axiosTokenWrapper.delete(`${getUrlByUserType(baseUrl)}/${id}`);
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

function companyUpdateBody(customer) {
    return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        password: customer.password
    }
}