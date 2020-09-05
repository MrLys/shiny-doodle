import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-icon.styles.scss'
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

const CartIcon = ({ cartCount, ...props }) => {
   return(
       <div className='cart-icon' onClick={() => props.toggleCartHidden()}>
          <ShoppingIcon className='shopping-icon'/>
           <span className='item-count'>{cartCount}</span>
       </div>
   )
};
const mapStateToProps = (state) => ({
    cartCount: selectCartItemsCount(state)
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
