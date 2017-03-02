import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
  class Authenticate extends React.Component{
    componentWillMount(){
      if(!this.props.isAuth){
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.context.router.push('/');
      }
    }

    render(){
      return(
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuth: React.PropTypes.bool.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuth
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
