import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

const addCartItem = (
  cartItems: CartItem[],
  itemToAdd: CategoryItem
): CartItem[] => {
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

const reduceCartItem = (
  cartItems: CartItem[],
  itemToReduce: CartItem
): CartItem[] => {
  if (itemToReduce.quantity < 2) return removeCartItem(cartItems, itemToReduce);
  return cartItems.map((item) =>
    item.id === itemToReduce.id
      ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
      : item
  );
};

const removeCartItem = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  return cartItems.filter((item) => item.id !== itemToRemove.id);
};

export const setIsCartOpen = withMatcher((boolean: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  itemToAdd: CategoryItem
): SetCartItems => setCartItems(addCartItem(cartItems, itemToAdd));

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): SetCartItems => setCartItems(removeCartItem(cartItems, itemToRemove));

export const reduceItemFromCart = (
  cartItems: CartItem[],
  itemToReduce: CartItem
): SetCartItems => setCartItems(reduceCartItem(cartItems, itemToReduce));
