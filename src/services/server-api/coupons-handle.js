import axiosTokenWrapper from '../axiosTokenWrapper';
import { toast } from 'react-toastify';

const URL_ADMIN = '/adminApi/coupons';

export const getAllCoupons = async () => {
    try {
        const response = await axiosTokenWrapper.get(URL_ADMIN);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postCoupon = async (coupon) => {
    try {
        const response = await axiosTokenWrapper.post(URL_ADMIN, couponPostBody(coupon));
        toast.success("New coupon was added successfully!");
        return response.data;
    } catch (error) {
        toast.error("Fail to create a new coupon.");
        throw error;
    }
};

export const updateCoupon = async (coupon) => {
    try {
        const response = await axiosTokenWrapper.put(URL_ADMIN, couponPutBody(coupon));
        toast.success(`Coupon ${coupon.title} was updated successfully!`);
        return response.data;
    } catch (error) {
        toast.error("Fail to create a new coupon.");
        throw error;
    }
};

export const purchaseCoupons = async (couponId) => {
    try {
        const response = await axiosTokenWrapper.put(`${URL_ADMIN}/${couponId}}`, {});
        toast.success("Purchase coupon was successful!");
        return response.data;
    } catch (error) {
        toast.error("Fail to purchase coupon.");
        throw error;
    }
};

export const deleteCoupon = async (couponId) => {
    try {
        const response = await axiosTokenWrapper.delete(`${URL_ADMIN}/${couponId}`);

        if (response.status >= 200 && response.status < 400)
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
        image: coupon.image,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        amount: coupon.amount,
        price: coupon.price,
        categoryId: coupon.categoryId,
        companyId: coupon.companyId
    }
}

function couponPutBody(coupon) {
    return {
        id: coupon.id,
        title: coupon.title,
        description: coupon.description,
        image: coupon.image,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        amount: coupon.amount,
        price: coupon.price,
        categoryId: coupon.categoryId,
        companyId: coupon.companyId
    }
}