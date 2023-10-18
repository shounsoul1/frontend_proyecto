import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {useAuth} from '../context/AuthContext.jsx';
import axios from 'axios';
function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL }/login`;
    const handleSubmit = async (evt)=> {
        evt.preventDefault();
        try {
            const response = await axios.post(url, {
                usuario: username,
                password: password,
            });

        const data = response.data;
        console.log(response.data);
        if (data.success) {
            setIsLoggedIn(true);
            alert('FUNCIONAAAAAAAAAAAA');
            navigate('/AdminRoute')
        } else {
            alert(data.message);
        }
        } catch (error) {
            console.log(error);
            alert('Error al intentar iniciar sesión');
        }
    };
    return (
        <>
            <section className="hero is-medium background-admin">
                <div className="hero-body is-flex is-justify-content-center is-align-items-center">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4 has-text-centered">
                                <form onSubmit={handleSubmit} className="box">
                                    <div className="field">
                                        <h1 className="is-size-2 has-text-blue title">Log in</h1>
                                        <label className="label is-size-5 has-text-blue has-text-left" htmlFor="user" >Usuario</label>
                                        <input id="user" value={username} onChange={(evt)=> setUsername(evt.target.value)} className="input is-small is-info" type="text" />
                                        <label className="label is-size-5 has-text-blue has-text-left" htmlFor="pass">Password</label>
                                        <input id="pass" value={password} onChange={(evt)=> setPassword(evt.target.value)} className="input is-small is-info" type="password" />
                                        <button type="submit" className="button is-outlined is-link mt-4">LOGIN</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Admin;

