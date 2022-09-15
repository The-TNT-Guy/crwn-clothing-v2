import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const navigateToCheckout = () => {
    setIsCartOpen(false)
    navigate("/checkout")
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cardItem) => (
          <CartItem key={cardItem.id} cardItem={cardItem} />
        ))}
      </div>
      <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
