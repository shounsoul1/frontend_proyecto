import {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import Card from '../components/Card';
import Filtro from '../components/Filtro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
function Productos() {
    const {isLoggedIn} = useAuth();
    const url = `${import.meta.env.VITE_API_URL }`;

    const [modal, setModal] = useState(false);

    const [productos, setProductos] = useState([]);
    const [tipo, setTipo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post(`${url}/crearProducto`, {
                tipo,
                nombre,
                descripcion,
                imagen,
                precio,
            });
            setTipo('');
            setNombre('');
            setDescripcion('');
            setImagen('');
            setPrecio('');
            const renderizar = await axios.get(`${url}/productos`);
            setProductos(renderizar.data);
            console.log('Producto agregado:', response.data);
            setModal(false);
        } catch (error) {
            console.error(`Error al agregar producto: ${error}`);
        }
    };

    useEffect(()=>{
        async function getProductos() {
            const response = await axios.get(`${url}/productos`);
            setProductos(response.data);
        }
        getProductos();
    }, []);
    console.log(url);
    console.log(productos);

    // No me funciono, pero lo dejo pa otra ocasion jeje:S
    // const actualizarPagina = ()=>{
    //     useEffect(() => {
    //     getProductos();
    //     // cada 10sg actualiza la pagina para mantener la informacion actualizad
    //     const interval = setInterval(() => {
    //         getProductos();
    //     }, 1000);
    //     // Limpia el intervalo cuando el componente se desmonta
    //     return () => clearInterval(interval);
    // }, []);
    // };

    // filtra los productos que traigo por su tipo, para dividirlos en diferentes categorias.
    const filtarProductosPorTipo = (tipo) =>{
        return productos.filter((producto) => producto.tipo === tipo);
    };
    return (
        <>
            <div className="has-background">
                <Filtro/>
                <section className=" m-4 has-background">
                    {isLoggedIn && (
                        <>
                            <div className={`modal ${modal ? 'is-active' : ''}`}>
                            <div className="modal-background"></div>
                            <div className="modal-content">
                                <div className="box">
                                <p className="title is-size-4 has-text-centered has-text-dark">Crear Producto</p>
                                <label className="label mb-3">Tipo:</label>
                                <input className="input is-small is-rounded" type="text" onChange={(evt)=>setTipo(evt.target.value)} />
                                <label className="label mt-3 mb-3">Nombre:</label>
                                <input className="input is-small is-rounded" type="text" onChange={(evt)=>setNombre(evt.target.value)} />
                                <label className="label mt-3 mb-3">Descripcion:</label>
                                <input className="input is-small is-rounded" type="text" onChange={(evt)=>setDescripcion(evt.target.value)} />
                                <label className="label mt-3 mb-3">Imagen url:</label>
                                <input className="input is-small is-rounded" type="text" onChange={(evt)=>setImagen(evt.target.value)} />
                                <label className="label mt-3 mb-3">Precio:</label>
                                <input className="input is-small is-rounded" type="text" onChange={(evt)=>setPrecio(evt.target.value)} />
                                <div className="is-flex mt-5">
                                    <button className="button is-success is-fullwidth mr-2" onClick={handleSubmit}>Guardar</button>
                                    <button className="button is-danger is-fullwidth ml-2" onClick={() => setModal(false)}>Cancelar</button></div>
                                </div>
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={() => setModal(false)}></button>
                            </div>
                            <Filtro/>
                        </>
                        )}
                    <div className="vistaProductos">
                        <div className='is-flex is-relative'>
                            <h1 id="entradas" className="mb-3 title" >Entradas</h1>
                            {isLoggedIn &&(
                                <p className='is-clickable soyunboton' onClick={()=>setModal(true)}><FontAwesomeIcon icon={faUpload} size="xl" style={{color: '#1765ee'}} /></p>
                            )}
                        </div>
                        <Card productos={filtarProductosPorTipo('Entrada')} setProductos={setProductos} />
                        <h1 id="ensaladas" className="mb-3 title">Ensaladas</h1>
                        <Card productos={filtarProductosPorTipo('Ensalada')} setProductos={setProductos} />
                        <h1 id="plato-principal" className="mb-3 title">Plato Principal</h1>
                        <Card productos={filtarProductosPorTipo('Plato_Principal')} setProductos={setProductos} />
                        <h1 id="postres" className="mb-3 title">Postres</h1>
                        <Card productos={filtarProductosPorTipo('Postre')} setProductos={setProductos} />
                        <h1 id="bebidas" className="mb-3 title">Bebidas</h1>
                        <Card productos={filtarProductosPorTipo('Bebida')} setProductos={setProductos} />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Productos;
