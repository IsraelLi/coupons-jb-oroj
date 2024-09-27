import { toast } from 'react-toastify';
import { getCompanies } from '../services/server-api/company-handle';
import { setCompanies } from '../redux/companiesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const useFetchCompanies = () => {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.companiesStore);

    useEffect(() => {
        getCompanies().then(res => {
            dispatch(setCompanies(res));
        }).catch(e => {
            toast.error("Fail to get companies from the server.");
            console.error("Fail to get companies from the server.", e);
        });
    }, [dispatch])

    return companies?.companies;
}