import React, {useState, useEffect} from 'react';
import axios from 'axios';
function VistaPersonal() {
    const url = `${import.meta.env.VITE_API_URL}`;
    const [empleados, setEmpleados] = useState([]);
    const [cargos, setCargos] = useState([]);
    useEffect(()=>{
        async function obtenerEmpleados() {
            const response = await axios.get(`${url}/empleados`);
            setEmpleados(response.data);
        }
        async function obtenerCargos() {
            const response = await axios.get(`${url}/cargos`);
            setCargos(response.data);
        }
        obtenerCargos();
        obtenerEmpleados();
    }, []);
    console.log(url);
    console.log(empleados);
    console.log(cargos);
    return (
        <>
        <section className="is-flex is-justify-content-center is-align-items-center centrado-paginas-espera is-flex-direction-column">
            <h1 className="title">Empleados</h1>
            <div className="table-container">
                <table className="table is-bordered ">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Cargo</th>
                        <th>Celular</th>
                        <th>Fecha Nacimiento</th>
                        <th>Tipo Documento</th>
                        <th>Numero Identificacion</th>
                        <th>Tipo Sangre</th>
                        <th>Estado Civil</th>
                        <th>Genero</th>
                        <th>Nivel Estudios</th>
                        <th>Direccion</th>
                        <th>Pais</th>
                        <th>Ciudad</th>
                        <th>Municipio/Estado</th>
                        <th>Calle</th>
                        <th>Codigo Postal</th>
                    </tr>
                    {empleados.map((empleado)=>(
                    <tr key={empleado.id}>
                        <td>{empleado._id}</td>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.apellido_paterno}</td>
                        <td>{empleado.apellido_materno}</td>
                        <td>{empleado.cargo}</td>
                        <td>{empleado.celular}</td>
                        <td>{empleado.informacion_detallada.fecha_nacimiento}</td>
                        <td>{empleado.informacion_detallada.tipo_documento}</td>
                        <td>{empleado.informacion_detallada.numero_identificacion}</td>
                        <td>{empleado.informacion_detallada.tipo_sangre}</td>
                        <td>{empleado.informacion_detallada.estado_civil}</td>
                        <td>{empleado.informacion_detallada.genero}</td>
                        <td>{empleado.informacion_detallada.nivel_estudios}</td>
                        <td>/</td>
                        <td>{empleado.informacion_detallada.direccion.pais}</td>
                        <td>{empleado.informacion_detallada.direccion.ciudad}</td>
                        <td>{empleado.informacion_detallada.direccion.municipio}</td>
                        <td>{empleado.informacion_detallada.direccion.calle}</td>
                        <td>{empleado.informacion_detallada.direccion.codigo_postal}</td>
                    </tr>
                    ))}
                </table>
            </div>
        </section>
        <section className="is-flex is-justify-content-center is-align-items-center centrado-paginas-espera is-flex-direction-column">
            <h1 className="title">Cargos</h1>
            <div className="table-container2">
                <table className="table2 is-bordered ">
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Cargo</th>
                        <th>Descripcion</th>
                    </tr>
                    {cargos.map((cargo)=>(
                    <tr key={cargo.id}>
                        <td className="pt-5 pb-6">{cargo._id}</td>
                        <td className="pt-5 ">{cargo.nombre_cargo}</td>
                        <td>{cargo.descripcion}</td>
                    </tr>
                    ))}
                </table>
            </div>
        </section>
        </>
    );
}

export default VistaPersonal;
