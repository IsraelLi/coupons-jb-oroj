import { toast } from 'react-toastify';
import { getCompanies } from '../services/server-api/company-handle';
import { setCompanies } from '../redux/companiesSlice'
import { useDispatch, useSelector } from 'react-redux';


export const useFetchCompanies = () => {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.companies);

    getCompanies().then(res => {
        dispatch(setCompanies(res));
    }).catch(e => {
        toast.error("Fail to get companies from the server.");
        console.error("Fail to get companies from the server.", e);
    });

    return companies;
}