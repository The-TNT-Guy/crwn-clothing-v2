import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cardCount: 0,
  setCardCount: () => null,
  cardTotal: 0,
  setCardTotal: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [cardTotal, setCardTotal] = useState(0);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const reduceItemFromCart = (itemToReduce) => {
    setCartItems(reduceCartItem(cartItems, itemToReduce));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    cardCount,
    cardTotal,
  };

  useEffect(() => {
    setCardCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    );
    setCardTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      )
    );
  }, [cartItems]);

  useEffect(() => {
    setCardTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      )
    );
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const addCartItem = (cartItems, itemToAdd) => {
  let hasMatch = false;
  const updatedItems = cartItems.map((item) => {
    if (item.id === itemToAdd.id) {
      hasMatch = true;
      return { ...item, quantity: item.quantity + 1 };
    } else return item;
  });

  if (hasMatch) return updatedItems;
  else return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, itemToReduce) => {
  if (itemToReduce.quantity < 2) return removeCartItem(cartItems, itemToReduce);
  return cartItems.map((item) =>
    item.id === itemToReduce.id
      ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
      : item
  );
};

const removeCartItem = (cartItems, itemToRemove) =>
  cartItems.filter((item) => item.id !== itemToRemove.id);
