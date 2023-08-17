import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import BooksList from './components/BooksList';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import User from './components/User/User';
import Books from './components/Books/Books';
import BookEdit from './components/Books/BookEdit';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { GlobalStyles } from './styles/Globalstyles';
import Form from './components/Form';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AuthWrapper, { AuthContext } from './context/authContext';
import { useContext } from 'react';
import UserEdit from './components/User/UserEdit';
import { CartWrapper } from './context/cartContext';
import Cart from './components/Cart';

// export const UserData = createContext()

function App() {
  const name = "Manthan";

  const userContext = useContext(AuthContext);
  const userInfo = userContext.user;
  
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'brown',
          },
        },
      },
    },
  });
  // const navigate = useNavigate();
  const Bo = {
    EditBook : "index/:id",
  };
  console.log("USerInfo",userContext.user);

  return (
    <div className="App">
      
      {/* <img src={'${process.env.REACT_APP_BASE_URL}/logo.svg'} alt="logo"/> */}
      {/* <img src={logo} alt="logo" width={80} height={80} /> */}

      <AuthWrapper>
        <CartWrapper>
      <ThemeProvider theme={theme}>
        {/* <UserData.Provider value={{name: "Test"}}> */}
        <BrowserRouter>
          <ToastContainer
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
          />
          {/* <div
            // style={{
            //   padding:10,
            //   justifyContent:"space-between"
            // }}
            // className='navbar'
            style={{
              ...GlobalStyles.navbar
            }}
          >
            <NavLink className='navlink' to='/'>Go to LoginPage</NavLink>
            <NavLink className='navlink' to='/form'>Go to Form</NavLink>
            <NavLink className='navlink' to='/homepage'>Go to HomePage</NavLink>
            <NavLink className='navlink' to='/books'>Go to BooksList</NavLink>
            <NavLink className='navlink' to='/bookdetails'>Go to Book Details</NavLink>
            <NavLink className='navlink' to='/userdetails'>Go to User Details</NavLink>
          </div> */}

          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path='/' element={<HomePage username={name} />}></Route>
            <Route path='/books' element={<BooksList />}></Route>
            <Route path='/bookdetails' element={<Books />}></Route>
            <Route exact path='/bookedit/:id' element={<BookEdit />}></Route>
            <Route exact path='/bookedit' element={<BookEdit />}></Route>
            <Route path='/userdetails' element={<User />}></Route>
            <Route path='/useredit/:id' element={<UserEdit />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            {/* <Route path={} element={< />}></Route> */}
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
        {/* </UserData.Provider> */}
      </ThemeProvider>
      </CartWrapper>
      </AuthWrapper>
    </div>

  );
}

export default App;
