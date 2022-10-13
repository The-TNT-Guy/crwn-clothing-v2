import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  return setCurrentUser.match(action)
    ? { ...state, currentUser: action.payload }
    : state;
};
