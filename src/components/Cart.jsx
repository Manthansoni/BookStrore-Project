import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useCartContext } from "../context/cartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import cartService from "../services/cartService";
import orderService from "../services/orderService";
import WithAuth from "../layout/WithAuth";


const Cart = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success("ORDER SUCCESS");
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  return (
    <div className="cart">
      <div className="container">
        <Typography variant="h3">Cart page</Typography>
        <div className="cart-heading-block">
          <Typography variant="h5">
            My Shopping Bag ({itemsInCart} Items)
          </Typography>
          <NavLink to={"/books"}>
            <Button variant="contained" style={{ background: "brown", margin: 5 }}>Back</Button>
          </NavLink>
          <div className="total-price">Total price: {totalPrice}</div>
        </div>
        <div className="cart-list-wrapper">
          {cartList.map((item,index) => {
            return (
              <div className="cart-list-item" key={index}>
                <div className="cart-item-img">
                  <Link>
                    <img src={item.book.base64image} alt="dummy-pic" />
                  </Link>
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-top-content">
                    <div className="cart-item-left">
                      <p className="brand">{item.book.name}</p>
                      <Link>Cart item name</Link>
                    </div>
                    <div className="price-block">
                      <span className="current-price">
                        MRP &#8377; {item.book.price}
                      </span>
                    </div>
                  </div>
                  <div className="cart-item-bottom-content">
                    <div className="qty-group">
                      <Button
                        className="btn-pink-btn"
                        onClick={() => updateQuantity(item, true)}
                      >
                        +
                      </Button>
                      <span className="number-count">{item.quantity}</span>
                      <Button
                        className="btn-pink-btn"
                        onClick={() => updateQuantity(item, false)}
                      >
                        -
                      </Button>
                    </div>
                    <Link onClick={() => removeItem(item.id)}>Remove</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-wrapper">
            <Button variant="contained" style={{ background: "brown", margin: 5 }} onClick={placeOrder}>
            Place order
          </Button>  
          
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Cart);
