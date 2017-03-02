import React, { PropTypes } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

injectTapEventPlugin();

import Header from './header/Header'
import MyTheme from './theme.js'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      splash: true
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(MyTheme) };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.auth){
      this.setState({
        splash: false
      });
    }
  }

  render() {
    var path = this.props.location.pathname;
    var segment = path.split('/')[1] || 'root';

    if(this.state.splash){
      return (
        <div className="splash">
          <img src="images/tastyhousesplash.png" alt="tasty house logo splash" width="130"/>
        </div>
      );
    }
    return (
      <div style={{ position: 'relative' }}>
        <Header pathname={this.props.location.pathname}/>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="pages"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {React.cloneElement(this.props.children, { key: segment })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

App.propTypes = {
  auth : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
