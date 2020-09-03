import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg';
const Header = () => {
    return (
        <div className='header'>
            <Link to="/" >
                <Logo className='logo-container' />
            </Link>
            <div className='options'>
                <Link className='option' to="/shop">Shop</Link>
                <Link className='option' to="/contact">Contact</Link>
                <Link className='option' to="/signin">Sign In</Link>
            </div>
        </div>
    )
};

export default Header;