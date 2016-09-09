import React, {Component} from 'react';

import {
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native';

import Info from './Info';

const derpCode = '0000';

class Select extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: "0000",
    };
  }

  goBack(){
    this.props.navigator.pop()
  }

  onSubmit(){
    if (derpCode === this.state.text) {
      this.props.navigator.push({
        component: Info
      })
    }
  }

  render(){
    return(
      <View style={{paddingTop: 20}}>
        <Text
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Login page
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          onPress={ () => this.onSubmit() }
        >
          <Text>Submit</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={ () => this.goBack() }
        >
          <View>
            <Text>Go back</Text>
          </View>
        </TouchableHighlight>
      </View>

    )
  }
}

export default Select
