import React, { PropTypes } from 'react'
import { TextField, RaisedButton, CircularProgress, FontIcon } from 'material-ui'

const Registrarse = ({onSave, onChange, email, password, disable, errors, cargando, ingresarFacebook, nombre, apellido, confirmPassword}) => {
  return (
    <div className="modal-contenedor">
      <form action="" onSubmit={onSave} noValidate={true}>
        <TextField
          floatingLabelText="Nombre"
          fullWidth={true}
          inputStyle={{ color: '#333' }}
          value={nombre}
          onChange={onChange}
          name="nombre"
          errorText={errors.nombre}
        />
        <TextField
          floatingLabelText="Apellido"
          fullWidth={true}
          inputStyle={{ color: '#333' }}
          value={apellido}
          onChange={onChange}
          name="apellido"
          errorText={errors.apellido}
        />
        <TextField
          id="emailRegistrarse"
          floatingLabelText="Email"
          fullWidth={true}
          type="email"
          inputStyle={{ color: '#333' }}
          value={email}
          onChange={onChange}
          name="email"
          errorText={errors.email}
        />
        <TextField
          floatingLabelText="Contraseña"
          fullWidth={true}
          type="password"
          inputStyle={{ color: '#333' }}
          value={password}
          onChange={onChange}
          name="password"
          errorText={errors.password}
        />
        <TextField
          floatingLabelText="Confirmar contraseña"
          fullWidth={true}
          type="password"
          inputStyle={{ color: '#333' }}
          value={confirmPassword}
          onChange={onChange}
          name="confirmPassword"
          errorText={errors.confirmPassword}
        />
        {cargando ? <div className="cargando">
          <CircularProgress size={16} thickness={2}/>
        </div> : <RaisedButton
          label="Registrarse"
          primary={true}
          fullWidth={true}
          style={{ marginTop: 30}}
          disabled={disable}
          disabledLabelColor={'rgba(0,0,0,0.4)'}
          type="submit"
        /> }
      </form>
    </div>
  );
}

Registrarse.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired
};

export default Registrarse;
