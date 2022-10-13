import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: any): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userState) => userState.currentUser
);
