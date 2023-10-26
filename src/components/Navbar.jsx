import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <>
        <nav id="navbar" className="nav">
            <Link className="is-unselectable" to="/Admin">LoginAdmin</Link>
            <Link className="is-unselectable" to="/Productos">Productos</Link>
            <Link className="is-unselectable" to="/"><FontAwesomeIcon className="" icon={faHouse} style={{color: '#bfcce3'}}/> Home</Link>
            <Link className="is-unselectable" to="/About_us">About us</Link>
            <Link className="is-unselectable" to="/Contact-us">Contact us</Link>
        </nav>
        </>

    );
}

export default Navbar;
