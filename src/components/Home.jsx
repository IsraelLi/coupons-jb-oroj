import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Profile from './login/Profile'
import Login from './login/Login';
import { Outlet } from 'react-router-dom';


function Home() {
    const [tokenEmail, setTokenEmail] = useState()

    useEffect(() => {
        setTokenEmail(localStorage.getItem('tokenEmail'))
        window.addEventListener('localStorageChange', handleStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, [])

    const handleStorageChange = () => {
        setTokenEmail(localStorage.getItem('tokenEmail'))
    }

    return (
        <div>
            {tokenEmail ? <Profile /> : <Login />}
            {tokenEmail && <Navigation />}

            
            <Outlet />
        </div>
    );
}


export default Home;