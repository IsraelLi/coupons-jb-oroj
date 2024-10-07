import React from 'react';
import Navigation from './Navigation';
import Profile from './login/Profile'
import Login from './login/Login';
import { Outlet } from 'react-router-dom';


function Home() {

    return (
        <div>
            {localStorage.getItem('userEmail') ? <Profile /> : <Login />}
            {localStorage.getItem('userEmail') && <Navigation />}
            <Outlet />
        </div>
    );
}

export default Home;