import React, {Component} from 'react';

import {
  Text,
  TouchableHighlight,
  View,
  ListView
} from 'react-native';

import axios from 'axios';

import DriverMap from './DriverMap';

class Info extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      drivers: [],
      shuttles: [],
      selectedDriver: '',
      selectedShuttle: ''
    }
  }

  goToMap(){
    this.props.navigator.push({
      component: DriverMap,
      driver: this.state.selectedDriver,
      shuttle: this.state.selectedShuttle
    })
  }

  goBack(){
    this.props.navigator.pop()
  }

  componentDidMount() {
    const app = this;
    axios({
      method: 'GET',
      responseType: 'json',
      url: 'http://localhost:3000/drivers'
    })
    .then(function(response) {
      console.log(response);
        app.setState({
          drivers: response.data
        })
        console.log('D:', app.state.drivers);
      })

    axios({
      method: 'GET',
      responseType: 'json',
      url: 'http://localhost:3000/shuttles'
    })
    .then(function(response) {
      console.log(response);
      app.setState({
        shuttles: response.data
      })
      console.log('S:', app.state.shuttles);
    })

  }

  selectDriver(driver) {
    // code to change selected driver
    console.log(`${driver.first_name} ${driver.last_name} selected`);
    this.setState({
      selectedDriver: driver
    })
  }

  selectShuttle(shuttle){
    console.log(`${shuttle.shuttle_num} selected`);
    this.setState({
      selectedShuttle: shuttle
    })
  }

  getState() {
    console.log('selectedShuttle:', this.state.selectedShuttle);
  }

  render(){
    return(
      <View style={{paddingTop: 20}}>
        <Text
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Info page
        </Text>

        <TouchableHighlight
          onPress={() => this.goBack()}>
          <Text>Go Back</Text>
        </TouchableHighlight>

        <Text>Drivers</Text>
        <ListView
          dataSource={this.ds.cloneWithRows(this.state.drivers)}
          renderRow={ driver => (
            <TouchableHighlight
              underlayColor={'#EEE'}
              onPress={ () => this.selectDriver(driver)}>

              <View>
                <Text numberOfLines={1}>{`${driver.first_name} ${driver.last_name}`}</Text>
              </View>
            </TouchableHighlight>
          )}
          />

          <Text>Shuttles</Text>

          <ListView
            dataSource={this.ds.cloneWithRows(this.state.shuttles)}
            renderRow={ shuttle => (
              <TouchableHighlight
                underlayColor={'#EEE'}
                onPress={ () => this.selectShuttle(shuttle)}>

                <View>
                  <Text numberOfLines={1}>{`${shuttle.shuttle_num}`}</Text>
                </View>
              </TouchableHighlight>
            )}
            />


          <TouchableHighlight
            onPress={() => this.getState()}>
            <Text> Get state </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.goToMap()}>
            <Text> Submit </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

export default Info;
