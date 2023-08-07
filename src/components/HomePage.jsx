import React from 'react';
import WithAuth from '../layout/WithAuth';
import Cookies from 'js-cookie';

const HomePage = () => {
    const username = Cookies.get("auth_email");
    return(<div>This is a Home page used by {username}</div>)
}

export default WithAuth(HomePage);