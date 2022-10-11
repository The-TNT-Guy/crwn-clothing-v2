import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter((item) => item.id !== itemToRemove.id);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, itemToAdd) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    addCartItem(cartItems, itemToAdd)
  );

export const removeItemFromCart = (cartItems, itemToRemove) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    removeCartItem(cartItems, itemToRemove)
  );

export const reduceItemFromCart = (cartItems, itemToReduce) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    reduceCartItem(cartItems, itemToReduce)
  );
