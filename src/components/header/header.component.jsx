import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.util';

const Header = ({signedIn}) => {
    return (
        <div className='header'>
            <Link to="/" >
                <Logo className='logo-container' />
            </Link>
            <div className='options'>
                <Link className='option' to="/shop">Shop</Link>
                <Link className='option' to="/contact">Contact</Link>
                {
                    signedIn ?
                        (<div className='option' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div>) :
                        (<Link className='option' to="/signin">SIGN IN</Link>)
                }
            </div>
        </div>
    )
};

export default Header;