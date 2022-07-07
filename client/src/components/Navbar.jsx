import { Link } from 'react-router-dom';

import logo from '../assets/images/logo-rond.svg';

function Navbar() {    

    return (
        <div className='navbar'>
            <Link to="/" className='logo-link'>
                <img className="logo" src={logo} alt="logo" />
            </Link>
            <span className="title">Introduction aux WebSockets</span> 
        </div>
    )
};

export default Navbar;