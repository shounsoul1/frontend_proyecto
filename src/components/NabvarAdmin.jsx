import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
function NabvarAdmin() {
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL}/logout`;

    const handleLogout = async ()=> {
        try {
            Swal.showLoading();
            const response = await axios.post(url);
            const data = response.data;
            if (data.success) {
                console.log(response.data);
                setIsLoggedIn(false);
                Swal.close();
                navigate('/');
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav>
            <Link to="/Admin/Home" className="is-unselectable">Home</Link>
            <Link to="/Admin/Productos" className="is-unselectable">Gestión de Productos</Link>
            <Link to="/Admin/Vista" className="is-unselectable">Vista Gestión Personal</Link>
            <Link to="/Admin/Gestion-personal" className="is-unselectable">Gestión de Personal</Link>
            <Link to="/ad" onClick={handleLogout} className="is-unselectable">Cerrar sesion</Link>
        </nav>
    );
}

export default NabvarAdmin;
