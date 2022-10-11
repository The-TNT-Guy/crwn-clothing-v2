import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addToCart = () => dispatch(addItemToCart(cartItems, cartItem));
  const reduceFromCart = () =>
    dispatch(reduceItemFromCart(cartItems, cartItem));
  const removeFromCart = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={name} />
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={reduceFromCart}>
          &#10094;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={addToCart}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={removeFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
