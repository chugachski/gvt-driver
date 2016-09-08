import React, {Component} from 'react';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Login from './Login'

class Select extends Component {
  constructor(props){
    super(props);
  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    })
  }


  render(){
    return(
      <View style={{paddingTop: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select screen</Text>

        <TouchableHighlight>
          <View>
            <Text>I'm a rider</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={ () => this.goToLogin() }
        >
          <View>
            <Text>I'm a driver</Text>
          </View>
        </TouchableHighlight>

      </View>
    )
  }
}

export default Select
