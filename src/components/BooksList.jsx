import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WithAuth from '../layout/WithAuth';

const BooksList = () => {
    // const {username} = props
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/") 
    }
return(
    <>
    <div>This is a collection of books</div>
    {/* <button onClick={handleButtonClick}>Go to Homepage</button> */}
    <Button variant='contained' color='info' onClick={handleButtonClick}>Go to Homepage</Button>

    </>
)
}

export default WithAuth(BooksList);