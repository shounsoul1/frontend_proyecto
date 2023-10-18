import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import {faHouse} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <nav>
            <Link to="/Admin">Admin</Link>
            <Link to="/Productos">Productos</Link>
            <Link className="" to="/"><FontAwesomeIcon className="" icon={faHouse} style={{color: '#bfcce3'}}/> Home</Link>
            <Link to="/About_us">About us</Link>
            <Link to="/Contact-us">Contact us</Link>
        </nav>
    );
}

export default Navbar;
