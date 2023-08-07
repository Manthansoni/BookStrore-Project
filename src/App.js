import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import BooksList from './components/BooksList';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { GlobalStyles } from './styles/Globalstyles';
import Form from './components/Form';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const name = "Manthan";
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

  return (
    <div className="App">
      <img src={logo} alt="logo" width={100} height={100} />
      {/* <img src={'${process.env.REACT_APP_BASE_URL}/logo.svg'} alt="logo"/> */}
      <ThemeProvider theme={theme}>
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
          <div
            // style={{
            //   padding:10,
            //   justifyContent:"space-between"
            // }}
            // className='navbar'
            style={{
              ...GlobalStyles.navbar
            }}
          >
            <NavLink to='/'>Go to LoginPage</NavLink><br></br>
            <NavLink to='/homepage'>Go to HomePage</NavLink><br></br>
            <NavLink to='/books'>Go to BooksList</NavLink><br></br>
            <NavLink to='/form'>Go to Form</NavLink>
          </div>

          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/homepage' element={<HomePage username={name} />}></Route>
            <Route path='/books' element={<BooksList />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
