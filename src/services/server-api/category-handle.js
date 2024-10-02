import axiosTokenWrapper from '../axiosTokenWrapper';
import { toast } from 'react-toastify';


const URL = '/adminApi/categories';

export const postCategory = async (categoryName) => {
    try {
        const response = await axiosTokenWrapper.post(URL, categoryPostBody(categoryName));

        if (response.status >= 200 && response.status < 400)
            toast.success(`New category: ${categoryName} was added successful!`);
        else
            toast.error(`Fail to post category: ${categoryName}.`);

        return response.data;
    } catch (error) {
        toast.error(`Fail to post category: ${categoryName}.`);
        console.error(`Fail to post new category.`, error);
    }
};

export const updateCategory = async (category) => {
    try {
        const response = await axiosTokenWrapper.put(URL, categoryUpdateBody(category));
        toast.success(`Category: ${category.name} was updated successfully!`);
        return response.data;
    } catch (error) {
        toast.error(`Fail to update category: ${category.name}.`);
        console.error(`Fail to put the category ${category.id}.`, error);
    }
};

export const getCategories = async () => {
    try {
        const response = await axiosTokenWrapper.get(URL);
        return response.data;
    } catch (error) {
        console.error(`Fail to get the categories from the server`, error);
    }
};

export const deleteCategoryById = async (id) => {
    try {
        const response = await axiosTokenWrapper.delete(`${URL}/${id}`);

        if (response.status >= 200 && response.status < 400)
            toast.success(`Category: ${id} was deleted successfully!`);
        else
            toast.error(`Fail to delete category: ${id}.`);
        return response.data;
    } catch (error) {
        toast.error(`Fail to delete category: ${id}.`);
        console.error(`Fail to delete category id: ${id}.`, error);
    }
};

function categoryPostBody(categoryName) {
    return {
        name: categoryName
    }
}


function categoryUpdateBody(company) {
    return {
        id: company.id,
        name: company.name
    }
}