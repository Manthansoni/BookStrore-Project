import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

const initialUserValue = {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    roleId: 0,
    role: "",
    password: "",
};

const intialState = {
    setUser: () => {},
    user: initialUserValue,
    signOut: () => {},
};

export const AuthContext = createContext(intialState);


const AuthWrapper = ({ children }) => {
    const [user, setUserData] = useState(initialUserValue);

    const setUser = (data) => {
        console.log("userContext data",data);
        Cookies.set("userInfo",JSON.stringify(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUserData(data);
    };

    const signOut = () => {
        Cookies.remove('userInfo');
        Cookies.remove('auth_email');
        
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userInfo")) || initialUserValue;
        console.log("localData",data);

        if(!data){
            // navigate("/");
        }

        setUserData(data);
    },[]);

    let value = {
        user,
        setUser,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthWrapper;