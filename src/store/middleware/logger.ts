import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log(
      "Logger - type: ",
      action.type,
      "payload: ",
      action.payload,
      "currentState: ",
      store.getState()
    );
    next(action);

    console.log("next state: ", store.getState());
  };
