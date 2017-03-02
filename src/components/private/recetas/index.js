import React, {PropTypes} from 'react'

import CrearReceta from './crearReceta/CrearReceta'

export default class Recetas extends React.Component {
  render() {
    return (
      <div className="contenedor">
        <div className="recetas-titulo">Recetas</div>
        <CrearReceta />
      </div>
    );
  }
}

Recetas.propTypes = {
};
