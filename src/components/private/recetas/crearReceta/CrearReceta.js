import React from 'react'
import { TextField, RaisedButton, CircularProgress } from 'material-ui'

const CrearReceta = ({}) => {
  return (
    <div className="fila">
      <div className="crear-recetas-titulo">Crear Receta</div>
      <div className="crear-recetas-input">
        <TextField
          floatingLabelText="Crea una nueva receta"
          fullWidth={true}
          inputStyle={{ color: '#333' }}
          name="nuevareceta"
        />
      </div>
      <div className="crear-recetas-boton">
        <RaisedButton
          label="Crear"
          primary={true}
          fullWidth={true}
          style={{ marginTop: 30}}
          disabledLabelColor={'rgba(0,0,0,0.4)'}
          type="submit"
        />
      </div>
    </div>
  );
};

export default CrearReceta;
