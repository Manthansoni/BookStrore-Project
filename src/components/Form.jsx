import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import authService from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Form1 = () => {

    const navigate = useNavigate();

    // const [username,setusername] = useState("");
    // const [password,setpassword] = useState("");
    const [userdetails, setuserdetails] = useState({
        username: "",
        password: "",
        email: "",
        age: "",
    });

    useEffect(() => {
        if (userdetails.username.length > 4) {
            console.log("length greater 4");
        }
    }, [userdetails.username]);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("username could not be empty"),
        // usern: Yup.String().matches(/^[a-zA-z0-9+_.-]+@[a-zA-Z0-9,-]+$/),
        email: Yup.string().email().required("Email could not be empty"),
        password: Yup.string().min(8).required("Password could not be empty"),
        age: Yup.number().min(18),

    })

    const handleSubmit = async (values) => {
        console.log("Username", userdetails.username);
        console.log("Password", userdetails.password);
        console.log("Email", userdetails.email);
        console.log("Age", userdetails.age);

        const payload = {
            firstName: values.username,
            lastName: "test",
            email: values.email,
            "roleId": 2,
            password: values.password,
        };

        await authService.Register(payload).then((response) => {
            // console.log(response);
            if(response && response.status === 200) {
                toast.success('Submitted Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate("/homepage");
            }
        }).catch((error) => {
                toast.error('Failed to Submit', {
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
    }
    return (
        <Formik initialValues={{ username: "", age: "", email: "", password: "" }}
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
                            <Typography variant='h4' sx={{ color: 'brown' }}>Register Here !</Typography>

                            <TextField
                                label="username"
                                name='username'
                                variant="outlined"
                                error={errors.username}
                                value={values.username}
                                onChange={(e) => setFieldValue("username", e.target.value)}
                                onBlur={handleBlur}
                            />
                            <FormHelperText error>
                                <ErrorMessage name='username' />
                            </FormHelperText>

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
                                label="age"
                                name='age'
                                variant="outlined"
                                value={values.age}
                                error={errors.age}
                                onChange={(e) => setFieldValue("age", e.target.value)}
                                onBlur={handleBlur}
                            />

                            <FormHelperText error>
                                <ErrorMessage name='age' />
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

        //     <div className='form'>
        //     <Typography variant='h4' sx={{ color: 'brown' }}>Register Here !</Typography>

        //     {/* <TextField label="userName" variant="outlined" value={username} onChange={(e) => setusername(e.target.value)}/>
        //     <TextField label="password" variant="outlined" value={password} onChange={(e) => setpassword(e.target.value)}/> */}

        //     <TextField label="username" name='username' variant="outlined" value={userdetails.username} onChange={(e) => setuserdetails((prev) => ({ ...prev, username: e.target.value }))} />
        //     <TextField label="email" name='email' variant="outlined" value={userdetails.email} onChange={(e) => setuserdetails((prev) => ({ ...prev, email: e.target.value }))} />
        //     <TextField label="age" name='age' variant="outlined" value={userdetails.age} onChange={(e) => setuserdetails((prev) => ({ ...prev, age: e.target.value }))} />
        //     <TextField label="password" name='password' variant="outlined" value={userdetails.password} onChange={(e) => setuserdetails((prev) => ({ ...prev, password: e.target.value }))} />

        //     <Button variant='contained' type='submit' onClick={handleSubmit}>Submit</Button>
        // </div>
    )
}

export default Form1;