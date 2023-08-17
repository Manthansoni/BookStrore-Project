import { AppBar, Button, Link, List, ListItem, TextField } from "@mui/material";
import React, { useContext } from "react";
import logo from "./../logo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import shared from "../utils/shared";
import cartIcon from "../assets/images/cart.png"
import { useCartContext } from "../context/cartContext";

const Header = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const cartContext = useCartContext();

  const logOut = () => {
    authContext.signOut();
    navigate("/login");
  };

  const addToCart = (book) => {
    if (!authContext.user.data.result.id) {
      navigate('/login');
      toast.error("Please login before adding books to cart");
    } else {
      shared.addToCart(book, authContext.user.data.result.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Item added in cart");
          cartContext.updateCart();
        }
      });
    }
  };

  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };
 console.log("cartContext",cartContext.cartData);
  return (
    <div>
      <AppBar className="site-header" id="header" position="static">
        <div className="bottom-header" style={{ background: "brown", marginTop:"-10" }}>
          <div className="container">
            <List className="top-nav-bar">
              {!authContext.user.id && (
                <>
                  <ListItem>
                    <NavLink to='/login' title="Login">
                      Login
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <Link to='./form' title="Register">
                      Register
                    </Link>
                  </ListItem>
                </>
              )}

            </List>
            {/* <List className="cart-country-wrap">
                        <ListItem className="cart-link">
                          <Link to="/cart" title="Cart">
                            <img src={cartIcon} alt="cart.png" />
                            <span>{cartContext.cartData.length}</span>
                            Cart
                          </Link>
                        </ListItem>
                        <ListItem className="hamburger" onClick={openMenu}>
                          <span></span>
                        </ListItem>
                      </List> */}

            {authContext.user.id && (
              <List className="right" style={{ float: "right" }}>
                <NavLink to="/cart"><Button variant="outlined" style={{ background: "white", margin: 5 }}>
                  <img src={cartIcon} alt="cart.png" />
                  <span>{cartContext.cartData.length}</span>
                  Cart
                  </Button>
                </NavLink>
                <NavLink to='/'><Button variant="outlined" style={{ background: "white", margin: 5 }}>
                  Home
                </Button></NavLink>
                <NavLink to='/books'><Button variant="outlined" style={{ background: "white", margin: 5 }}>
                  Books
                </Button></NavLink>
                <NavLink to="/bookdetails"><Button variant="outlined" style={{ background: "white", margin: 5 }}>
                  Book Details
                </Button></NavLink>
                <NavLink to="/userdetails"><Button variant="outlined" style={{ background: "white", margin: 5 }}>
                  User Details
                </Button></NavLink>
                <Button onClick={() => logOut()} variant="outlined" style={{ background: "white", margin: 5 }}>
                  Log out
                </Button>
              </List>
            )}
          </div>
        </div>
        <div
          className="search-overlay"
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        {/* <div className="header-search-wrapper">
              <div className="container">
                <div className="header-search-outer">
                  <div className="header-search-inner">
                    <div className="text-wrapper">
                      <TextField
                        id="text"
                        name="text"
                        placeholder="What are you looking for..."
                        variant="outlined"
                        value={query}
                        onChange={(e) => setquery(e.target.value)}
                      />
    
                      
                    </div>
                    <Button
                      type="submit"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={search}
                    >
                      <em>
                        <img src={searchIcon} alt="search" />
                      </em>
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div> */}
      </AppBar>
    </div>
  );
};

export default Header;