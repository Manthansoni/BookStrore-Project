import React from 'react';
import WithAuth from '../layout/WithAuth';
import Cookies from 'js-cookie';
import Header from './Header';

const HomePage = () => {
    const username = Cookies.get("auth_email");
    return (
        <div>
            <Header />
            <p>This is a Home page used by {username}</p>
        </div>

    );
}

export default WithAuth(HomePage);