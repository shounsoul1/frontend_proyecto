import React from 'react';

function PageAdmin() {
    return (
        <>
            <div className="homeAdmin">
                <h1 className="title has-text-centered">Pagina para los administradores</h1>
                <br />
                <p className="is-size-3 has-text-centered">Aqui podras modificar el crud de la pagina,
                la idea es que puedas modificar <br/>los productos del restaurante, pero a la vez tambien <br/>gestionar los temas administrativos del restaurante <br/> por ejemplo
                los empleados, los cargos, los permisos, las vacaciones <br/> y en un futuro proximo los pagos.
                </p>
            </div>
        </>
    );
}

export default PageAdmin;
