import {compose} from "redux"
import Cart from "./cart-dropdown.component";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});


const CartDropdownContainer = compose(withRouter, connect(mapStateToProps))(Cart);

export default CartDropdownContainer;
