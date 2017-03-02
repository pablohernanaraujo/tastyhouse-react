import React, { PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'

import Recetas from './recetas'
import Perfil from './perfil'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Person from  'material-ui/svg-icons/social/person-outline'

class PrivatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          inkBarStyle={{backgroundColor: 'rgba(75,75,75,0.8)'}}
        >
          <Tab
            value={0}
            icon={<ContentPaste />}
          />
          <Tab
            value={1}
            icon={<Person />}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <Recetas />
          <Perfil />
        </SwipeableViews>
      </div>
    );
  }
}

export default PrivatePage;
