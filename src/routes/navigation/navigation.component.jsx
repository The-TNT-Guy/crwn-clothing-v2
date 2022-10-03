import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../context/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {
  StyledLogo,
  StyledNavigation,
  StyledNavLink,
  StyledNavLinks,
} from "./navigation.styles";

const Navigation = () => {
  const { isCartOpen } = useContext(CartContext);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Fragment>
      <StyledNavigation>
        <StyledLogo to="/">
          <CrwnLogo />
        </StyledLogo>
        <StyledNavLinks>
          <StyledNavLink className="nav-link" to="/shop">
            SHOP
          </StyledNavLink>
          {currentUser ? (
            <StyledNavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </StyledNavLink>
          ) : (
            <StyledNavLink to="/auth">SIGN-IN</StyledNavLink>
          )}
          <CartIcon />
        </StyledNavLinks>
        {isCartOpen && <CartDropdown />}
      </StyledNavigation>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
