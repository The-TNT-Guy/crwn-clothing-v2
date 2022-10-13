import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
};

const INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  return setCartItems.match(action)
    ? {
        ...state,
        cartItems: action.payload,
      }
    : setIsCartOpen.match(action)
    ? {
        ...state,
        isCartOpen: action.payload,
      }
    : state;
};
