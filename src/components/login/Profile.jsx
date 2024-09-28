import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import './Profile.css';
import { updateLocalStorage } from '../../services/updateLocalStorage';


const userNamePlaceHolder = 'please login:';

function Profile() {
    const [userName, setUserName] = useState(userNamePlaceHolder);
    const [userEmail, setUserEmail] = useState()
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        setUserEmail(localStorage.getItem('userEmail'))
        window.addEventListener('localStorageChange', handleStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, [])

    useEffect(() => {
        let newValue = userEmail ? userEmail.split('@')[0] : userNamePlaceHolder;

        if (userType) newValue += `(${userType})`;

        setUserName(newValue)
    }, [userEmail, userType])

    const handleStorageChange = () => {
        setUserEmail(localStorage.getItem('userEmail'))
    }

    const handleLogout = () => {
        updateLocalStorage('token');
        updateLocalStorage('userEmail');
        updateLocalStorage('userType');
    }

    return (
        <Container className='profile'>
            <p>Welcome, {userName}</p>
            {userEmail &&
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