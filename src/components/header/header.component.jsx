import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.util';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss'


const Header = ({currentUser, hidden}) => {
    const f = () => {console.log(currentUser); auth.signOut();};
    return (
        <div className='header'>
            <Link to="/" >
                <Logo className='logo-container' />
            </Link>
            <div className='options'>
                <Link className='option' to="/shop">SHOP</Link>
                <Link className='option' to="/contact">CONTACT</Link>
                {
                    currentUser ?
                        (<div className='option' onClick={f}> SIGN OUT </div>)
                        :
                        (<Link className='option' to="/signin">SIGN IN</Link>)
                }
                <CartIcon />
            </div>
            {
                hidden ?
                    null
                    :
                    <CartDropDown />
            }
        </div>
    )
};

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser: currentUser,
    hidden: hidden
});

export default connect(mapStateToProps)(Header);