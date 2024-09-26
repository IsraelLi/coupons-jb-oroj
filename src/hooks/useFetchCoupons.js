import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCoupons } from '../services/server-api/coupons-handle';
import { setCoupons } from '../redux/couponsSlice'
import { useEffect } from 'react';


export const useFetchCoupons = () => {
    const dispatch = useDispatch();
    const coupons = useSelector(state => state.coupons.coupons);

    useEffect(() => {
        getAllCoupons().then(res => {
            
            dispatch(setCoupons(res));
        }).catch(e => {
            toast.error("Fail to get coupons from the server.");
            console.error("Fail to get coupons from the server.", e);
        });
    }, [dispatch, coupons])

    return coupons;
}