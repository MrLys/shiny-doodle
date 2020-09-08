import React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.util";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {
  HeaderContainer,
  LogoContainer,
  OptionContainer,
  OptionLink,
} from "./header.styles";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdownContainer from "../cart-dropdown/cart-dropdown.container";

const Header = ({ currentUser, hidden }) => {
  const f = () => {
    console.log(currentUser);
    auth.signOut();
  };
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo-container" />
      </LogoContainer>
      <OptionContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={f}>
            {" "}
            SIGN OUT{" "}
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionContainer>
      {hidden ? null : <CartDropdownContainer />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
