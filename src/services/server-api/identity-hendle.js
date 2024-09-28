import axios from 'axios';
import { updateLocalStorage } from '../updateLocalStorage';


const URL = '/auth/token';

/**
 * Enable for admin authorization only 
 * @returns 
 */
export const postLogin = async (email, password, type) => {
    try {
        const response = await axios.post(URL, getBody(email, password, type));

        updateLocalStorage('token', response.data)
        return response.data;
    } catch (error) {
        updateLocalStorage('token')
        console.error(`Fail to create the token for the user: ${type}`, error)
    }
};

function getBody(email, password, type) {
    return {
        email: email,
        password: password,
        type: type
    };
}