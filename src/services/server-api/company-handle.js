import axiosTokenWrapper from './axiosTokenWrapper';
import { toast } from 'react-toastify';


const URL = '/adminApi/companies';

export const postCompany = async (company) => {
    try {
        const response = await axiosTokenWrapper.post(`${URL}`, companyPostBody(company));
        toast.success(`New company: ${company.name} was added successful!`);
        return response.data;
    } catch (error) {
        toast.error(`Fail to post company: ${company.name}.`);
        console.error(`Fail to post new company.`, error);
    }
};

export const updateCompany = async (company) => {
    try {
        const response = await axiosTokenWrapper.put(URL, companyUpdateBody(company));
        toast.success(`Company: ${company.name} was updated successfully!`);
        return response.data;
    } catch (error) {
        toast.error(`Fail to update company: ${company.name}.`);
        console.error(`Fail to put the company ${company.id}.`, error);
    }
};

export const getCompanies = async () => {
    try {
        const response = await axiosTokenWrapper.get(`${URL}`);
        return response.data;
    } catch (error) {
        console.error(`Fail to get the companies from the server`, error);
    }
};

export const deleteCompanyById = async (id) => {
    try {
        const response = await axiosTokenWrapper.delete(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Fail to delete company id: ${id}.`, error);
    }
};

function companyPostBody(company) {
    return {
        name: company.name,
        email: company.email,
        password: company.password
    }
}

function companyUpdateBody(company) {
    return {
        id: company.id,
        name: company.name,
        email: company.email,
        password: company.password
    }
}