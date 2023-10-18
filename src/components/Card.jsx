import PropTypes from 'prop-types';
function Card({productos}) {
    return (
        <>
            <div className="columns is-flex-wrap-wrap ">
                {productos.map((producto)=>(
                <div key={producto.id} className="column is-3">
                    <div className="card  has-background-black">
                        <div className="card-image">
                            <figure className="image is-3by2">
                                <img className='image ' src={producto.imagen}/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media-content is-family-sans-serif">
                                <p className="title is-5 is-family-monospace has-text-weight-medium has-text-centered has-text-warning">{producto.nombre}</p>
                                <p className="title no is-7 is-family-monospace has-text-weight-medium has-text-centered has-text-warning is-capitalized">{producto.descripcion}</p>
                                <div className="is-flex is-justify-content-space-around ">
                                    <p className=" pl-1 pr-1 my-text has-text-success-dark">Precio: {producto.precio} COP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
}

Card.propTypes = {
    productos: PropTypes.array.isRequired,
};

export default Card;
