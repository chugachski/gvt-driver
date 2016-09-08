import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Select from './Select';

class gvtDriver extends Component {
  renderScene(route, navigator) {
    const Component = route.component;
    return(
        <Component navigator={navigator} {...route} />
      )
    }

    render() {
      return (
        <Navigator
          initialRoute={{component: Select}}
          renderScene={ (route, navigator) => this.renderScene(route, navigator) }
        />
      )
    }
  }

export default gvtDriver

AppRegistry.registerComponent('gvtDriver', () => gvtDriver);
