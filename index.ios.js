/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

const routes = [
  { title: 'select', index: 0 },
  { title: 'login', index: 1 },
  { title: 'driverDetails', index: 2 },
  { title: 'driverApp', index: 3 },
  { title: 'passengerApp', index: 4 },
]

class gvtDriver extends Component {
  render() {
    return(
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <TouchableHighlight
            style={{backgroundColor: '#AAA'}}
            onPress={() => {
            if (route.index === 0) {
              navigator.push(routes[1]);
            } else {
              navigator.pop();
            }
          }}>
          <Text>Hello {route.title}!</Text>
          </TouchableHighlight>
        }
        style={{padding: 100}}
      />
    );
  }
}

export default gvtDriver

AppRegistry.registerComponent('gvtDriver', () => gvtDriver);


