import { Route, Routes } from "react-router-dom";
import CategoriesOverview from "../categories-overview/categories-overview.component";
import CategoryProducts from "../category-products/category-products.component";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesOverview />} />
      <Route path=":category" element={<CategoryProducts />} />
    </Routes>
  );
};

export default Shop;
