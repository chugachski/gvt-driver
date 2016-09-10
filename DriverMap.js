import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  View,
  TouchableHighlight,
  MapView,
  StyleSheet
} from 'react-native';

import axios from 'axios';

class DriverMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      shuttleId: '',
      driverId: '',

      mapRegion: {
        latitude: 60.965727,
        longitude: -149.136103,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      },
      annotations: [{
        latitude: 60.965727,
        longitude: -149.136103,
      }],
    };
  }

  goBack(){
    this.props.navigator.pop()
  }

  setLoc(){
    navigator.geolocation.watchPosition(function(position) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/trackings/${this.state.shuttleId}`,
        data: {
          new_lat: position.coords.latitude,
          new_lng: position.coords.longitude,
          new_driver_id: this.props.driver.id,
          new_shuttle_id: this.props.shuttle.id
        }
      })
    });
  }

  goBack(){
    this.props.navigator.pop()
  }

  logout(){
    // const ape = this
    console.log(this.props.shuttle.id);
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/trackings/' + this.props.shuttle.id,
    });
  }

  componentDidMount(){
    // Geolocation get position should happen here instead of hardcoded
    // lat/lng. The idea is that if the app should crash or close, it should grab current
    // location instead of starting it at Tramway before the next update.
    // Leaving it hardcoded until testing on watchPosition is done.

    // const options = {
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    //   maximumAge: 1000
    // }
    //
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     console.log('shuttlePos:', position);
    //     // set state
    //     this.setState({
    //       annotations: [{
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       }]
    //     })
    //   },
    //   (error) => alert(error.message), options
    // );


    const app = this
      axios({
        method: 'POST',
        url: 'http://localhost:3000/trackings/new',
        data: {
          lat: 60.970598,
          lng: -149.096939,
          driver_id: this.props.driver.id,
          shuttle_id: this.props.shuttle.id
        }
      }).then(function(response){
        console.log(response);
        // app.setState({shuttleId: response.data[0].id})
        // app.setLoc()
      })
  }

  render(){
    // console.log('t.p.:', this.props);

    function formatNames(first, last) {
      return(
        first.charAt(0).toUpperCase() +
        first.substr(1) + ' ' +
        last.charAt(0).toUpperCase() +
        last.substr(1)
      )
    }

    return(
      <View style={styles.container}>

        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          annotations={this.state.annotations} />

        <Text>Driver: {formatNames(this.props.driver.first_name, this.props.driver.last_name)}</Text>
        <Text>Shuttle: {this.props.shuttle.shuttle_num}</Text>

        <TouchableHighlight
          onPress={() => this.logout()}>
          <Text> LOGOUT </Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.goBack()}>
          <Text>Go Back</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 125
  },
})

export default DriverMap;
