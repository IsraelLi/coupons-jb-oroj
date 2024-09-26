import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import './Profile.css';
import { updateLocalStorage } from '../../services/updateLocalStorage';
import { useSelector } from "react-redux";


const userNamePlaceHolder = 'please login:';

function Profile() {
    const [userName, setUserName] = useState(userNamePlaceHolder);
    const [tokenEmail, setTokenEmail] = useState()
    const userType = useSelector(state => state.userStore.user);

    useEffect(() => {
        setTokenEmail(localStorage.getItem('tokenEmail'))
        window.addEventListener('localStorageChange', handleStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, [])

    useEffect(() => {
        let newValue = tokenEmail ? tokenEmail.split('@')[0] : userNamePlaceHolder;

        if (userType) newValue += `(${userType})`;

        setUserName(newValue)
    }, [tokenEmail, userType])

    const handleStorageChange = () => {
        setTokenEmail(localStorage.getItem('tokenEmail'))
    }

    const handleLogout = () => {
        updateLocalStorage('tokenEmail');
        updateLocalStorage('token');
    }

    return (
        <Container className='profile'>
            <p>Welcome, {userName}</p>
            {tokenEmail &&
                <Button
                    className='logout-btn'
                    variant="secondary"
                    size="sm"
                    onClick={handleLogout}>Logout
                </Button>}
        </Container>
    );
}

export default Profile;