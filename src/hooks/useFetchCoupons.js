import { useDispatch, useSelector } from 'react-redux';
import { getAllCoupons } from '../services/server-api/coupons-handle';
import { setCoupons } from '../redux/couponsSlice'
import { useEffect } from 'react';


export const useFetchCoupons = () => {
    const dispatch = useDispatch();
    const coupons = useSelector(state => state.couponsStore);

    useEffect(() => {
        getAllCoupons().then(res => {
            dispatch(setCoupons(res));
        }).catch(e => {
            console.error("Fail to get coupons from the server.", e);
        });
    }, [dispatch])

    return coupons?.coupons;
}