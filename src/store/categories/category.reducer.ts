import { Category } from "./category.types";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSucces,
} from "./category.action";
import { AnyAction } from "redux";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };

  if (fetchCategoriesSucces.match(action))
    return { ...state, categories: action.payload, isLoading: false };

  if (fetchCategoriesFailed.match(action))
    return { ...state, error: action.payload, isLoading: false };

  return state;
};
