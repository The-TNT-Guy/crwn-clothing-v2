import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSucces = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const newCategoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSucces(newCategoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
