import { toast } from 'react-toastify';
import { getCategories } from '../services/server-api/category-handle';
import { setCategories } from '../redux/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux';


export const useFetchCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    getCategories().then(res => {
        dispatch(setCategories(res));
    }).catch(e => {
        toast.error("Fail to get categories from the server.");
        console.error("Fail to get categories from the server.", e);
    });

    return categories?.categories;
}