import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cardCount: 0,
  setCardCount: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cardCount, setCardCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cardCount,
  };

  useEffect(() => {
    setCardCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    );
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const addCartItem = (cartItems, productToAdd) => {
  let hasMatch = false;
  const updatedItems = cartItems.map((item) => {
    if (item.id === productToAdd.id) {
      hasMatch = true;
      return { ...item, quantity: item.quantity + 1 };
    } else return item;
  });

  if (hasMatch) return updatedItems;
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};
