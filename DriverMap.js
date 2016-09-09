import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import axios from 'axios';

class DriverMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      shuttleId: '',
    };
  }

  setLoc(){
    navigator.geolocation.watchPosition(function(position) {
      axios({
        method: 'PUT',
        url: 'http://localhost:3000/trackings/${this.state.shuttleId}',
        data: {
          new_lat: position.coords.latitude,
          new_lng: position.coords.longitude,
          new_driver_id: this.props.driver.id,
          new_shuttle_id: this.props.shuttle.id
        }
      })
    });
  }

  componentDidMount(){
    // Geolocation get position should happen here instead of hardcoded
    // lat/lng. The idea is that if the app should crash or close, it should grab current
    // location instead of starting it at Tramway before the next update.
    // Leaving it hardcoded until testing on watchPosition is done.
    const app = this
      axios({
        method: 'POST',
        url: 'http://localhost:3000/trackings/new'
        data: {
          lat: 60.970598,
          lng: -149.096939,
          driver_id: this.props.driver.id,
          shuttle_id: this.props.shuttle.id
        }
      }).then(function(response){
        console.log(response);
        app.setState({shuttleId: response.data[0].id})
        app.setLoc()
      })
  }

  render(){
    return(
      <View>
        <Text>Show map here</Text>
        <Text>Here is driver {this.props.driver.first_name}</Text>
        <Text>Here is shuttle {this.props.shuttle.shuttle_num}</Text>
      </View>
    )
  }
}


export default DriverMap;
