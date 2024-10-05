import axiosTokenWrapper from '../axiosTokenWrapper';
import { toast } from 'react-toastify';
import { getUrlByUserType } from '../urlByUserType';

const baseUrl = 'Api/coupons';

export const getAllCoupons = async () => {
    try {
        const response = await axiosTokenWrapper.get(getUrlByUserType(baseUrl));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyCoupons = async (userEmail) => {
    try {
        const response = await axiosTokenWrapper.get(`${getUrlByUserType(baseUrl)}/${userEmail}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postCoupon = async (coupon) => {

    try {
        const response = await axiosTokenWrapper.post(getUrlByUserType(baseUrl), couponPostBody(coupon));
        toast.success("New coupon was added successfully!");
        return response.data;
    } catch (error) {
        toast.error("Fail to create a new coupon.");
        throw error;
    }
};

export const updateCoupon = async (coupon) => {
    try {
        const response = await axiosTokenWrapper.put(getUrlByUserType(baseUrl), couponPutBody(coupon));
        toast.success(`Coupon ${coupon.title} was updated successfully!`);
        return response.data;
    } catch (error) {
        toast.error("Fail to create a new coupon.");
        throw error;
    }
};

export const purchaseCoupon = async (couponId) => {
    const email = localStorage.getItem('userEmail');

    try {
        await axiosTokenWrapper.put(getUrlByUserType(baseUrl), null, {
            params: {
                customerEmail: email,
                couponId: couponId
            }
        });
        toast.success(`Purchase coupon: ${couponId} was successful!`);
        
    } catch (error) {
        if (error.status === 409)
            toast.error("Only one coupon can be purchased.");
        else
            toast.error("Fail to purchase coupon.");
    }
};

export const deleteCoupon = async (couponId) => {
    try {
        const response = await axiosTokenWrapper.delete(`${getUrlByUserType(baseUrl)}/${couponId}`);

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