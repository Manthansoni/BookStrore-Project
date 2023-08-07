import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import authService from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().min(8).required("Password is required"),
    });

    const handleSubmit = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        await authService.Login(payload).then((response) => {
            if(response && response.status === 200) {
                toast.success('Login Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    Cookies.set("auth_email", values.email);
                    navigate('/homepage');
            }
        }).catch((response) => {
            toast.error('Failed to Login', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    };

    return(
        <Formik initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {({ values, errors, setFieldValue, handleBlur }) => {
            console.log("error", errors)
            return (
                // console.log("Vals", values)
                <Form>
                    {/* <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    /> */}

                    <div className='form'>
                        <Typography variant='h4' sx={{ color: 'brown' }}>Login Here !</Typography>

                        <TextField
                            label="email"
                            name='email'
                            variant="outlined"
                            value={values.email}
                            error={errors.email}
                            onChange={(e) => setFieldValue("email", e.target.value)}
                            onBlur={handleBlur}
                        />

                        <FormHelperText error>
                            <ErrorMessage name='email' />
                        </FormHelperText>

                        <TextField
                            label="password"
                            name='password'
                            variant="outlined"
                            value={values.password}
                            error={errors.password}
                            onChange={(e) => setFieldValue("password", e.target.value)}
                            onBlur={handleBlur}
                        />

                        <FormHelperText error>
                            <ErrorMessage name='password' />
                        </FormHelperText>

                        <Button variant='contained' type='submit'>Submit</Button>
                    </div>
                </Form>

            )
        }}
    </Formik >
    )
}

export default Login;