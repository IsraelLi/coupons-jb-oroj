import { useDispatch, useSelector } from 'react-redux';
import { getMyCoupons } from '../services/server-api/coupons-handle';
import { setMyCoupons } from '../redux/myCouponsSlice'
import { useEffect } from 'react';


export const useFetchMyCoupons = () => {
    const dispatch = useDispatch();
    const coupons = useSelector(state => state.myCouponsStore);
    const userEmail = localStorage.getItem('userEmail')

    useEffect(() => {
        getMyCoupons(userEmail).then(res => {
            dispatch(setMyCoupons(res));
        }).catch(e => {
            console.error("Fail to get my-coupons from the server.", e);
        });
    }, [dispatch, userEmail])

    return coupons?.coupons;
}