import { Button, FormControl, InputLabel, MenuItem, Select, TabScrollButton, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WithAuth from '../layout/WithAuth';
import { AuthContext } from '../context/authContext';
import bookService from '../services/bookService';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Pagination from '@mui/material/Pagination';
import { defaultFilter } from '../constant/constant';
import Header from './Header';
import shared from '../utils/shared';
import { useCartContext } from '../context/cartContext';
import { VerticalAlignBottom } from '@mui/icons-material';

const BooksList = () => {
    // const {username} = props
    const authcontext = useContext(AuthContext);
    const cartContext = useCartContext();

    const [bookResponse, setbookResponse] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [filters, setFilter] = useState(defaultFilter);

    useEffect(() => {
        getAllCategories();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (filters.keyword === "") delete filters.keyword;
            searchAllBooks({ ...filters });
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const searchAllBooks = (filters) => {
        bookService.getAll(filters).then((res) => {
            setbookResponse(res.data.result);
            // setCategories(res.data.result);
        });
    };

    const getAllCategories = async () => {
        await bookService.GetAllBooks().then((res) => {
            if (res) {
                setCategories(res.data.result);
            }
        });
    };

    console.log(categories);

    const books = useMemo(() => {
        const booklist = [...bookResponse.items];
        if (booklist) {
            booklist.forEach((element) => {
                element.category = categories.find(
                    (a) => a.id === element.categoryId
                )?.name;
            });
            return booklist;
        }
        return [];
    }, [categories, bookResponse]);

    const sortBooks = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResponse.items];

        bookList.sort((a, b) => {
            if (a.name < b.name) {
                return e.target.value === "a-z" ? -1 : 1;
            }
            if (a.name > b.name) {
                return e.target.value === "a-z" ? 1 : -1;
            }
            return 0;
        });
        setbookResponse({ ...bookResponse, items: bookList });
    };

    const addToCart = (book) => {
        shared.addToCart(book, authcontext.user.id).then((res) => {
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
                cartContext.updateCart();
            }
        });
    };



    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate("/")
    }

    // const userInfo = useContext(UserData);

    const userContext = useContext(AuthContext);
    // console.log("Context Data",userInfo);
    console.log("USerInfo", userContext.user);
    console.log("Bookrresp", bookResponse);
    return (
        <>
            <Header />
            {/* <div>This is a collection of books</div> */}
            {/* <button onClick={handleButtonClick}>Go to Homepage</button> */}
            {/* <Button variant='contained' color='info' onClick={handleButtonClick}>Go to Homepage</Button> */}


            <Typography variant='h5' style={{float:"left",margin:20}}>
                Total
                <span> - {categories.length} </span>
            </Typography>

            <TextField
                style={{margin:20}}
                id="text"
                name="text"
                placeholder="Search..."
                variant="outlined"
                inputProps={{ className: "small" }}
                onChange={(e) => {
                    setFilter({ ...filters, keyword: e.target.value, pageIndex: 1 });
                }}
            />


            <FormControl variant='outlined' style={{margin:20,width:120,float:"right"}}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    MenuProps={{
                    }}
                    onChange={sortBooks}
                    value={sortBy}
                >
                    <MenuItem value="a-z">a-z</MenuItem>
                    <MenuItem value="z-a">z-a</MenuItem>
                </Select>
            </FormControl><br></br>


            {books.map((categories, index) => (
                <div class="wrapper" key={index}>
                    <div class="container" >
                        <div class="top"><img src={categories.base64image} height={290} width={230} className='image' alt='img' /></div>
                        <div class="bottom">
                            <div class="left">
                                <div class="details">

                                    <h4>{categories.name}</h4>
                                    <p>{categories.category}</p>
                                    <p>{categories.description}</p>
                                    <p>MRP &#8377; {categories.price}</p>

                                </div>
                            </div>
                        </div>
                        <Button className='butto'>
                            <span
                                className="MuiButton-label"
                                onClick={() => addToCart(categories)}
                            >
                                ADD TO CART
                            </span>
                            <span className="MuiTouchRipple-root"></span>
                        </Button>
                    </div>
                </div>
            ))}
            <br></br>

            <Pagination
                className='pagination'
                count={bookResponse.totalPages}
                page={filters.pageIndex}
                onChange={(e, newPage) => {
                    setFilter({ ...filters, pageIndex: newPage });
                }}
            />


        </>
    );
};

export default WithAuth(BooksList);