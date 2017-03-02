import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Dialog, FlatButton } from 'material-ui'
import classNames from 'classnames'
import { WindowResizeListener } from 'react-window-resize-listener'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../../actions'
import Ingresar from '../ingresar'
import Registrarse from '../registrarse'
import validateLogin from '../../validations/login'
import validateRegister from '../../validations/register'

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
      open: false,
      menu: false,
      modalTitulo: '',
      modalType: true,
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      disable: true,
      errors: {},
      cargando: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.ingresarFacebook = this.ingresarFacebook.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleOpen(modal){
    if(modal === 'ingresar'){
      this.setState({
        modalTitulo: 'Ingresar',
        modalType: true,
        open: true
      });
    }
    if(modal === 'registrarse'){
      this.setState({
        modalTitulo: 'Registrarse',
        modalType: false,
        open: true
      });
    }
  }

  handleClose(){
    this.setState({
      open: false,
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      errors: {},
      disable: true,
      cargando: false
    });
  }

  onChangeField(e){
    this.setState({
      [e.target.name]: e.target.value
    });
    if(this.state.modalType){
      if(this.state.email !== '' && this.state.password !== ''){
        this.setState({
          disable: false
        });
      }else{
        this.setState({
          disable: true
        });
      }
    }else{
      if(this.state.email !== '' && this.state.password !== '' && this.state.nombre !== '' && this.state.apellido !== '' && this.state.confirmPassword !== ''){
        this.setState({
          disable: false
        });
      }else{
        this.setState({
          disable: true
        });
      }
    }
  }

  isValid(){
    this.setState({
      cargando: true
    });
    if(this.state.modalType){
      const { errors, isValid } = validateLogin(this.state);
  		if(!isValid){
  			this.setState({
          errors,
          cargando: false
        });
  		}
      return isValid;
    }else{
      const { errors, isValid } = validateRegister(this.state);
  		if(!isValid){
  			this.setState({
          errors,
          cargando: false
        });
  		}
      return isValid;
    }


	}

  onSubmit(e){
		e.preventDefault();
    if(this.isValid()){
      if(this.state.modalType){
        this.props.login({
          email: this.state.email,
          password: this.state.password
        }, (data) => {
          if(data === 'bienvenido'){
            this.setState({
              errors: {},
              email: '',
              password: '',
              cargando: false,
              disable: true,
              open: false
            });
          }else if(data === 'El usuario no existe.'){
            this.setState({
              errors:{ email: data  },
              cargando: false
            });
          }else{
            this.setState({
              errors:{ password: data },
              cargando: false
            });
          }
        });
      }else{
        this.props.register({
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          email: this.state.email,
          password: this.state.password
        }, (data) => {
          if(data === 'bienvenido'){
            this.setState({
              errors: {},
              email: '',
              password: '',
              confirmPassword: '',
              nombre: '',
              apellido: '',
              cargando: false,
              disable: true,
              open: false
            });
          }else if(data === 'El email se encuentra en uso.'){
            this.setState({
              errors:{ email: data  },
              cargando: false
            });
          }else if(data === 'El password debe tener al menos 6 digitos'){
            this.setState({
              errors:{ password: data },
              cargando: false
            });
          }else{
            this.setState({
              errors:{ passwordConfirm: data },
              cargando: false
            });
          }
        });
      }

		}
	}

  ingresarFacebook(){
    this.props.loginFacebook();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.auth.isAuth){
      this.setState({
        errors: {},
        email: '',
        password: '',
        cargando: false,
        disable: true,
        open: false
      });
    }
  }

  logout(){
    this.props.logout();
  }

  render() {
    let navBotones = <nav
      className="nav"
    >
      <a
        className="nav-btn"
        onTouchTap={() => this.handleOpen('ingresar')}
      >
        <span>Ingresar</span>
      </a>
      <a
        className="nav-btn"
        onTouchTap={() => this.handleOpen('registrarse')}
      >
        <span>Registrarse</span>
      </a>
    </nav>;

    if(this.props.auth.isAuth){
      navBotones = <nav
        className="nav"
      >
        <Link
          to="/"
          className={classNames(this.props.pathname === '/' ? "nav-btn nav-btn-active" : "nav-btn")}
        >
          <span>Inicio</span>
        </Link>
        <Link
          to="/private"
          className={classNames(this.props.pathname === '/private' ? "nav-btn nav-btn-active" : "nav-btn")}
        >
          <span>{this.props.auth.user.nombre}</span>
        </Link>
        <a
          className="nav-btn"
          onClick={this.logout}
        >
          <span>Salir</span>
        </a>
      </nav>;
    }

    const actions = [
      <FlatButton
        label="Cerrar"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <WindowResizeListener
          onResize={windowSize => {
            if(windowSize.windowWidth > 800){
              this.setState({
                menu: false
              });
            }else if(windowSize.windowWidth <= 800){
              this.setState({
                menu: true
              });
            }
          }}
        />
        <header className="header">
          <img
            src="images/tastylogoblanco.png"
            alt="tasty house logo"
            className="logo"
          />
          {navBotones}
        </header>
        <Dialog
          title={this.state.modalTitulo}
          actions={actions}
          modal={true}
          open={this.state.open}
          titleStyle={{color: '#333', textAlign: 'center'}}
          autoScrollBodyContent={true}
        >
          {this.state.modalType ? <Ingresar
              onSave={this.onSubmit}
              onChange={this.onChangeField}
              disable={this.state.disable}
              email={this.state.email}
              password={this.state.password}
              errors={this.state.errors}
              cargando={this.state.cargando} ingresarFacebook={this.ingresarFacebook}
            /> : <Registrarse
              onSave={this.onSubmit}
              onChange={this.onChangeField}
              disable={this.state.disable}
              email={this.state.email}
              password={this.state.password}
              errors={this.state.errors}
              cargando={this.state.cargando}
              nombre={this.state.nombre}
              apellido={this.state.apellido}
              confirmPassword={this.state.confirmPassword}
            />}

        </Dialog>
      </div>
    );
  }
}

Header.propTypes = {
  auth : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
