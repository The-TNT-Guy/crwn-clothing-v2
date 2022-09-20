import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    // addCollectionAndDocuments("categories", SHOP_DATA)
    const getCategories = async () => {
      const newCategoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(newCategoryMap);
    };

    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
