import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

function Filtro() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div className="is-flex is-justify-content-space-around filtro nav">
                <div className="is-flex nav">
                    <p className="has-text-white is-clickable mr-6 is-unselectable"><span onClick={() => scrollToSection('entradas')}>Entradas</span></p>
                    <FontAwesomeIcon icon={faMinus} size="xl" style={{color: '#5a0202'}} />
                    <p className="has-text-white is-clickable mr-6 ml-6 is-unselectable"><span onClick={() => scrollToSection('ensaladas')}>Ensaladas</span></p>
                    <FontAwesomeIcon icon={faMinus} size="xl" style={{color: '#5a0202'}} />
                    <p className="has-text-white is-clickable mr-6 ml-6 is-unselectable"><span onClick={() => scrollToSection('plato-principal')}>Plato Principal</span></p>
                    <FontAwesomeIcon icon={faMinus} size="xl" style={{color: '#5a0202'}} />
                    <p className="has-text-white is-clickable mr-6 ml-6 is-unselectable"><span onClick={() => scrollToSection('postres')}>Postres</span></p>
                    <FontAwesomeIcon icon={faMinus} size="xl" style={{color: '#5a0202'}} />
                    <p className="has-text-white is-clickable ml-6 is-unselectable"><span onClick={() => scrollToSection('bebidas')}>Bebidas</span></p>
                </div>
        </div>
    );
}

export default Filtro;
