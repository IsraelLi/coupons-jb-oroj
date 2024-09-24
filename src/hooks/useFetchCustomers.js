import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCustomers } from '../services/server-api/customers-handle';
import { setCustomers } from '../redux/customersSlice'
import { useSelector } from "react-redux";


export const useFetchCustomers = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);

    getAllCustomers().then(res => {
        dispatch(setCustomers(res));
    }).catch(e => {
        toast.failed("Fail to get customers from the server.");
        console.error("Fail to get customers from the server.", e);
    });

    return customers;
}