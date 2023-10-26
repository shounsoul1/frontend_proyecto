import PropTypes from 'prop-types';
import {useAuth} from '../context/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX, faRotate, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useState} from 'react';
function Card({productos, setProductos}) {
    const {isLoggedIn} = useAuth();
    const [modal, setModal] = useState('false');
    const [editar, setEditar] = useState(null);
    const [boton, setBoton] = useState(false);
    const urlBorrar = `${import.meta.env.VITE_API_URL}/borrarProducto`;
    const urlActualizar = `${import.meta.env.VITE_API_URL}/actualizarProducto`;

    const actualizarProducto = async (id)=>{
        try {
            const producto = productos.find((producto) => producto._id === id);
            setEditar(producto);
            setModal(true);
            console.log(editar.tipo);
        } catch (error) {
            console.error(`Error al actualizar producto: ${error}`);
        }
    };
    const guardarCambios = async (id) => {
        try {
            console.log(productos);
            const response = await axios.put(`${urlActualizar}/${id}`, editar);
            console.log('Cambios guardados:', response.data);
            setBoton(false);
            Swal.fire({
                title: '¡Actualizado!',
                text: 'El producto ha sido Actualizado con éxito.',
                icon: 'success',
            });
            setProductos((prevProductos) => prevProductos.map((producto) =>producto._id === id ? response.data : producto));
            console.log(productos);
            setModal(false);
        } catch (error) {
            console.error(`Error al guardar los cambios: ${error}`);
        }
    };
    const borrarProducto = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No se puede revertir!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!',
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`${urlBorrar}/${id}`);
                console.log(response);
                setProductos((prevProductos)=>prevProductos.filter((producto)=>producto._id !== id));
                Swal.fire({
                    title: '¡Borrado!',
                    text: 'El producto ha sido borrado.',
                    icon: 'success',
                });
            }
        } catch (error) {
            console.error(`Error al borrar el producto con id ${id}:`, error);
        }
    };
    return (
        <>
            <div className="columns is-flex-wrap-wrap ">
                {productos.map((producto)=>(
                <div key={producto.id} className="column is-3 ">
                    <div className="card background-card card-hover ">
                        <div className="card-image ">
                            <figure className="image is-4by3 is-relative ">
                                <img className='image is-unselectable image-hover has-background-black' src={producto.imagen}/>
                                {isLoggedIn &&(
                                    <>
                                    <p className="is-delete m-2 is-clickable" onClick={()=> borrarProducto(producto._id)}><FontAwesomeIcon icon={faX} size="xl" style={{color: '#f40606'}} /></p>
                                    <p className="is-update m-2 is-clickable" onClick={()=> {
                                        console.log('Producto ID:', producto._id); actualizarProducto(producto._id);
                                        }}><FontAwesomeIcon icon={faRotate} size="xl" style={{color: '#1765ee'}} /></p>
                                    </>
                                )}
                            </figure>
                        </div>
                        <div className="card-content is-relative">
                            <div className="media-content is-family-sans-serif">
                                <p className="title is-5 has-text-weight-medium has-text-centered has-text-white nombre-producto">{producto.nombre}</p>
                                <p className="title no is-7 is-family-monospace has-text-centered has-text-weight-medium descripcion">{producto.descripcion}</p>
                                <div className="is-flex is-justify-content-space-around">
                                    <p className="pl-1 pr-1 my-text has-text-warning-dark">
                                        Precio: {producto.precio} COP
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            {editar && (
                <div className={`modal ${modal ? 'is-active' : ''}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                        <div className="is-flex is-relative mb-2">
                            <label className="label">Tipo:</label>
                            <button className={`button is-small is-delete ${boton ? 'is-success' : 'is-danger'}`} onClick={() => setBoton((prevState)=>!prevState)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                        </div>
                        <div className="select is-fullwidth is-rounded ">
                            <select className="has-text-dark ok " onChange={(evt)=>setEditar({...editar, tipo: evt.target.value})} value={editar.tipo} disabled={!boton}>
                                <option value="" className="ok ">Productos</option>
                                <option value="Entrada" className="ok">Entrada</option>
                                <option value="Ensalada" className="ok">Ensalada</option>
                                <option value="Plato_Principal" className="ok">Plato_Principal</option>
                                <option value="Postre" className="ok">Postre</option>
                                <option value="Bebida" className="ok">Bebida</option>
                            </select>
                        </div>
                        {/* <input className="input is-small is-capitalized is-size-6 has-text-weight-light is-rounded" type="text" value={editar.tipo} onChange={(evt)=>setEditar({...editar, tipo: evt.target.value})} disabled={!boton} /> */}
                        <label className="label mt-3 mb-3">Nombre:</label>
                        <input className="input is-small is-capitalized is-size-6 has-text-weight-light is-rounded" type="text" value={editar.nombre} onChange={(evt)=>setEditar({...editar, nombre: evt.target.value})} disabled={!boton} />
                        <label className="label mt-3 mb-3">Descripcion:</label>
                        <input className="input is-small is-size-6 has-text-weight-light is-rounded" type="text" value={editar.descripcion} onChange={(evt)=>setEditar({...editar, descripcion: evt.target.value})} disabled={!boton} />
                        <label className="label mt-3 mb-3">Imagen url:</label>
                        <input className="input is-small is-size-6 has-text-weight-light is-rounded" type="text" value={editar.imagen} onChange={(evt)=>setEditar({...editar, imagen: evt.target.value})} disabled={!boton} />
                        <label className="label mt-3 mb-3">Precio:</label>
                        <input className="input is-small is-size-6 has-text-weight-light is-rounded" type="text" value={editar.precio} onChange={(evt)=>setEditar({...editar, precio: evt.target.value})} disabled={!boton} />
                        <div className="is-flex mt-5">
                            <button className="button is-success is-rounded is-fullwidth mr-3" onClick={()=>guardarCambios(editar._id)}>Guardar</button>
                            <button className="button is-danger is-rounded is-fullwidth ml-3" onClick={() => {
                                setModal(false), setBoton(false);
                                }}>Cancelar</button></div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => setModal(false)}></button>
                </div>
            )}
        </>
    );
}

Card.propTypes = {
    productos: PropTypes.array.isRequired,
    setProductos: PropTypes.array.isRequired,
};

export default Card;
