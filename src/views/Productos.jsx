import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../components/Card';
function Productos() {
    const url = `${import.meta.env.VITE_API_URL }/productos`;
    const [productos, setProductos] = useState([]);

    useEffect(()=>{
        async function getProductos() {
            const response = await axios.get(url);
            setProductos(response.data);
        }
        getProductos();
    }, []);
    console.log(url);
    console.log(productos);
    const filtarProductosPorTipo = (tipo) =>{
        return productos.filter((producto) => producto.tipo === tipo);
    };
    return (
        <section className="container m-4">
            <h1 className="mb-4 title">Entradas</h1>
            <Card productos={filtarProductosPorTipo('Entrada')}/>
            <h1 className="mb-4 title">Ensaladas</h1>
            <Card productos={filtarProductosPorTipo('Ensalada')}/>
            <h1 className="mb-4 title">Plato Principal</h1>
            <Card productos={filtarProductosPorTipo('Plato_Principal')}/>
            <h1 className="mb-4 title">Postres</h1>
            <Card productos={filtarProductosPorTipo('Postre')}/>
            <h1 className="mb-4 title">Bebidas</h1>
            <Card productos={filtarProductosPorTipo('Bebida')}/>
        </section>
    );
}

export default Productos;
