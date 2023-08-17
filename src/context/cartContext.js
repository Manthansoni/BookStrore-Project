import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import cartService from "../services/cartService";
import { AuthContext } from "./authContext";

const initialState = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrapper = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    updateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user.id]);

  const updateCart = () => {
    cartService.getList(authContext.user.id).then(response => setCartData(response));
  };

  console.log("cartData",cartData);
  const emptyCart = () => {
    setCartData([]);
  };
  let value = {
    cartData,
    updateCart,
    emptyCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
