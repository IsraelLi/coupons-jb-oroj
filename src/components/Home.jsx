import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Profile from './login/Profile'
import Login from './login/Login';
import { Outlet } from 'react-router-dom';


function Home() {
    const [userEmail, setUserEmail] = useState()

    useEffect(() => {
        setUserEmail(localStorage.getItem('userEmail'))
        window.addEventListener('localStorageChange', handleStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, [])

    const handleStorageChange = () => {
        setUserEmail(localStorage.getItem('userEmail'))
    }

    return (
        <div>
            {userEmail ? <Profile /> : <Login />}
            {userEmail && <Navigation />}

            
            <Outlet />
        </div>
    );
}


export default Home;