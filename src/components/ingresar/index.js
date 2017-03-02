import React, { PropTypes } from 'react'
import { TextField, RaisedButton, CircularProgress, FontIcon } from 'material-ui'

const Ingresar = ({onSave, onChange, email, password, disable, errors, cargando, ingresarFacebook}) => {
  return (
    <div className="modal-contenedor">
      <form action="" onSubmit={onSave} noValidate={true} >
        <TextField
          id="email"
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
        {cargando ? <div className="cargando">
          <CircularProgress size={16} thickness={2}/>
        </div> : <RaisedButton
          label="Ingresar"
          primary={true}
          fullWidth={true}
          style={{ marginTop: 30}}
          disabled={disable}
          disabledLabelColor={'rgba(0,0,0,0.4)'}
          type="submit"
        /> }
      </form>
      <div className="facebook-btn-contenedor">
        <RaisedButton
          label="Facebook"
          backgroundColor="#6d84b4"
          labelColor="#fff"
          className="facebook-btn"
          icon={
            <FontIcon
              className="fa fa-facebook-square facebook-icono"
            />
          }
          onClick={ingresarFacebook}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

Ingresar.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default Ingresar;
