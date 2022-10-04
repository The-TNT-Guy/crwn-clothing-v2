import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategoriesArray } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesOverview from "../categories-overview/categories-overview.component";
import CategoryProducts from "../category-products/category-products.component";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // addCollectionAndDocuments("categories", SHOP_DATA)
    const getCategories = async () => {
      const newCategoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategoriesArray(newCategoriesArray));
    };

    getCategories();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesOverview />} />
      <Route path=":category" element={<CategoryProducts />} />
    </Routes>
  );
};

export default Shop;
