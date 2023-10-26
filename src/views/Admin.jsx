import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '../context/AuthContext.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL }/login`;
    const handleSubmit = async (evt)=> {
        evt.preventDefault();
        try {
            Swal.showLoading();
            const response = await axios.post(url, {
                usuario: username,
                password: password,
            });

        const data = response.data;
        console.log(response.data);
        if (data.success) {
            Swal.close();
            setIsLoggedIn(true);
            navigate('/Admin/Home');
        } else {
            console.log(data.message);
        }
        } catch (error) {
            Swal.close();
            console.log(error);
        }
    };
    return (
        <>
            <section className="hero is-medium background-admin vistaAdmin">
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

