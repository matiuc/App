
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {createDrawerNavigator, DrawerItems, DrawerActions} from 'react-navigation-drawer';

import Search from '../Search';
import * as firebase from "firebase";


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    markers: []
  };
  async componentDidMount() {
    json = await
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region:
          {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }
        })
      }, //Succes
      () => { }, //Error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
    firebase.database().ref("Pins").on("value", (data)=> {
      var json = data.toJSON()
      for (key in json) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: {
                latitude: json[key]["latitude"],
                longitude: json[key]["longitud"]
              },
              id: json[key]["id"]

            }
          ]
        });
     }
    })
  };
  onPress = () => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region:
          {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }
        })
        this._map.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }, 1)
      }, //Succes
      () => { }, //Error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
    console.log("Buscando")
  };
  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry;
    this.setState({
      region:
      {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
    })
    this._map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 1);
  };
  // Update state on region change
  onRegionChange = region => {
    this.setState({
      region: region
    });
  }

  // Action to be taken after select location button click
  onLocationSelect = () => {
    alert(this.state.userLocation)
  };
  handlePress = () => {
    this.props.navigation.navigate("PinInfo", 
    { latitude: this.state.region.latitude, 
    longitud: this.state.region.longitude });
  }
  render() {
    const { region } = this.state;

    return (<View style={{ flex: 1 }}>
      
      <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Image source={require('AwesomeProject/assets/arrow.png')}

          style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={this.handlePress}>
        <Image source={require('AwesomeProject/assets/add.png')}

          style={{ width: 60, height: 60 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button5} onPress={() => 
      this.props.navigation.navigate("Buscar")}>
        <Image source={require('AwesomeProject/assets/search.png')}

          style={{ width: 60, height: 60 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button4} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
        <Image source={require('AwesomeProject/assets/menu.png')}

          style={{ width: 50, height: 50 }} />
      </TouchableOpacity>

      <MapView
        ref={component => this._map = component}
        style={{ flex: 1 }}
        provider={'google'}
        initialRegion={region}
        showsUserLocation={true}
        loadingEnabled={true}
        onRegionChangeComplete={this.onRegionChange}
      >
        {this.state.markers.map((marker) => {
          return (
            <Marker identifier = {marker.identifier}
            coordinate = {marker.coordinate}
            onPress = {()=>{this.props.navigation.navigate("Pin", {id: marker.id})}}>
              <View style={styles.marker}>
              </View>
            </Marker>
          )
        })}
      </MapView>
      
      <View style={styles.mapMarkerContainer}>
        <Text style={{
          fontFamily: 'fontawesome', fontSize: 40, color:
            "#ad1f1f"
        }}>&#xf041;</Text>
      </View>
      <Search onLocationSelected={this.handleLocationSelected}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '46%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: 50,
    height: 50,
    bottom: HEIGHT / 7.36 ,
    left: WIDTH / 20,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    justifyContent: 'center'


  },
  button2: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: 45,
    height: 45,
    bottom: HEIGHT / 7.36 ,
    right: WIDTH / 20,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    justifyContent: 'center'


  },
  button4: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: 45,
    height: 45,
    top: HEIGHT / 25,
    left: WIDTH / 20,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    justifyContent: 'center'


  },

  button5: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row-reverse',
    width: 45,
    height: 45,
    top: HEIGHT / 25,
    right: WIDTH / 20,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    alignItems: 'center',
    shadowColor: 'black',
    justifyContent: 'center'


  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
    width: 20,
    height: 45,
  },
});