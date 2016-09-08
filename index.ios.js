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

// class gvtDriver extends Component {
//   render() {
//     return(
//       <Navigator
//         initialRoute={routes[0]}
//         initialRouteStack={routes}
//         renderScene={(route, navigator) =>
//           <TouchableHighlight
//             style={{backgroundColor: '#AAA'}}
//             onPress={() => {
//             if (route.index === 0) {
//               navigator.push(routes[1]);
//             } else {
//               navigator.pop();
//             }
//           }}>
//           <Text>Hello {route.title}!</Text>
//           </TouchableHighlight>
//         }
//         style={{padding: 100}}
//       />
//     );
//   }
// }


class SimpleNavigationApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          return (
            <MyScene
              title={route.title}

              // Function to call when a new scene should be displayed
              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}

              // Function to call to go back to the previous scene
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          )
        }
      />
    )
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


export default gvtDriver

AppRegistry.registerComponent('gvtDriver', () => gvtDriver);


