import { createContext, useReducer } from "react";
import { CART_ACTION_TYPES } from "../store/cart/cart.types";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => null,
  cartTotal: 0,
  setCartTotal: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null,
});

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in userReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (itemToAdd) =>
    updateCartItemsReducer(addCartItem(cartItems, itemToAdd));

  const removeItemFromCart = (itemToRemove) =>
    updateCartItemsReducer(removeCartItem(cartItems, itemToRemove));

  const reduceItemFromCart = (itemToReduce) =>
    updateCartItemsReducer(reduceCartItem(cartItems, itemToReduce));

  const setIsCartOpen = (bool) =>
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

  const value = {
    cartItems,
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  };

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
