import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cardItem }) => {
  const { name, imageUrl, quantity, price } = cardItem;
  const { addItemToCart, reduceItemFromCart, removeItemFromCart } =
    useContext(CartContext);

  const addToCart = () => addItemToCart(cardItem);
  const reduceFromCart = () => reduceItemFromCart(cardItem);
  const removeFromCart = () => removeItemFromCart(cardItem);

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
