import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCustomers } from '../services/server-api/customers-handle';
import { setCustomers } from '../redux/customersSlice'
import { useEffect } from 'react';


export const useFetchCustomers = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);

    useEffect(() => {
        getAllCustomers().then(res => {
            dispatch(setCustomers(res));
        }).catch(e => {
            toast.error("Fail to get customers from the server.");
            console.error("Fail to get customers from the server.", e);
        });
    }, [dispatch, customers])

    return customers;
}