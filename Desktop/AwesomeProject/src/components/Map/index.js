
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation-drawer';

import Search from '../Search';
import * as firebase from "firebase";


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    markers: [],
    filtro1: "",
    filtro2: "",
    filtro3: "",
  };

  Bdd = (data) => {
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
    };
  }

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
    if ((this.state.filtro1 !== "") && (this.state.filtro2 !== "") && (this.state.filtro3 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      var actual = new Date()
      var suma = 0
      if (this.state.filtro3 === "Hoy") {
        suma = 0
      } if (this.state.filtro3 === "Mañana") {
        suma = 1
      } if (this.state.filtro3 === "Esta Semana") {
        day = actual.toString().split(" ")[0]
        sum = 0
        if (day === "Mon") {
          sum = 7
        } if (day === "Tue") {
          sum = 6
        } if (day === "Wed") {
          sum = 5
        } if (day === "Thu") {
          sum = 4
        } if (day === "Fri") {
          sum = 3
        } if (day === "Sat") {
          sum = 2
        } if (day === "Sun") {
          sum = 1
        }
        for (var i = 0; i < sum; i++) {
          
          fecha = actual.toString().split(" ")
          const filtro = this.state.filtro2.toString() + "_" +
            this.state.filtro1.toString() + "_" +
            fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
          const query = categoria.orderByChild("comuna_categoria_fecha")
            .equalTo(filtro).once("value", (data) => {
              this.Bdd(data)
            })
            actual.setDate(actual.getDate() + 1)
        }
        return
      }
      actual.setDate(actual.getDate() + suma)
      fecha = actual.toString().split(" ")
      const filtro = this.state.filtro2.toString() + "_" +
        this.state.filtro1.toString() + "_" +
        fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
      const query = categoria.orderByChild("comuna_categoria_fecha")
        .equalTo(filtro).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro1 !== "") && (this.state.filtro2 !== "") && !(this.state.filtro3 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      const query = categoria.orderByChild("comuna_categoria")
        .equalTo(this.state.filtro2.toString() + "_" + this.state.filtro1.toString()).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro1 !== "") && (this.state.filtro3 !== "") && !(this.state.filtro2 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      var actual = new Date()
      var suma = 0
      if (this.state.filtro3 === "Hoy") {
        suma = 0
      } if (this.state.filtro3 === "Mañana") {
        suma = 1
      } if (this.state.filtro3 === "Esta Semana") {
        day = actual.toString().split(" ")[0]
        sum = 0
        if (day === "Mon") {
          sum = 7
        } if (day === "Tue") {
          sum = 6
        } if (day === "Wed") {
          sum = 5
        } if (day === "Thu") {
          sum = 4
        } if (day === "Fri") {
          sum = 3
        } if (day === "Sat") {
          sum = 2
        } if (day === "Sun") {
          sum = 1
        }
        for (var i = 0; i < sum; i++) {
          
          fecha = actual.toString().split(" ")
          console.log(fecha)
          const filtro = this.state.filtro1.toString() + "_" +
            fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
          const query = categoria.orderByChild("categoria_fecha")
            .equalTo(filtro).once("value", (data) => {
              this.Bdd(data)
            })
            actual.setDate(actual.getDate() + 1)
        }
        return
      }
      actual.setDate(actual.getDate() + suma)
      fecha = actual.toString().split(" ")
      const filtro = this.state.filtro1.toString() + "_" +
        fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
      const query = categoria.orderByChild("categoria_fecha")
        .equalTo(filtro).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro3 !== "") && (this.state.filtro2 !== "") && !(this.state.filtro1 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      var actual = new Date()
      var suma = 0
      if (this.state.filtro3 === "Hoy") {
        suma = 0
      } if (this.state.filtro3 === "Mañana") {
        suma = 1
      } if (this.state.filtro3 === "Esta Semana") {
        day = actual.toString().split(" ")[0]
        sum = 0
        if (day === "Mon") {
          sum = 7
        } if (day === "Tue") {
          sum = 6
        } if (day === "Wed") {
          sum = 5
        } if (day === "Thu") {
          sum = 4
        } if (day === "Fri") {
          sum = 3
        } if (day === "Sat") {
          sum = 2
        } if (day === "Sun") {
          sum = 1
        }
        for (var i = 0; i < sum; i++) {
          
          fecha = actual.toString().split(" ")
          const filtro = this.state.filtro2.toString() + "_" +
            fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
          const query = categoria.orderByChild("comuna_fecha")
            .equalTo(filtro).once("value", (data) => {
              this.Bdd(data)
            })
            actual.setDate(actual.getDate() + 1)
        }
        return
      }
      actual.setDate(actual.getDate() + suma)
      fecha = actual.toString().split(" ")
      const filtro = this.state.filtro2.toString() + "_" +
        fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
      const query = categoria.orderByChild("comuna_fecha")
        .equalTo(filtro).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro3 !== "") && !(this.state.filtro2 !== "") && !(this.state.filtro1 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      var actual = new Date()
      var suma = 0
      if (this.state.filtro3 === "Hoy") {
        suma = 0
      } if (this.state.filtro3 === "Mañana") {
        suma = 1
      } if (this.state.filtro3 === "Esta Semana") {
        day = actual.toString().split(" ")[0]
        sum = 0
        if (day === "Mon") {
          sum = 7
        } if (day === "Tue") {
          sum = 6
        } if (day === "Wed") {
          sum = 5
        } if (day === "Thu") {
          sum = 4
        } if (day === "Fri") {
          sum = 3
        } if (day === "Sat") {
          sum = 2
        } if (day === "Sun") {
          sum = 1
        }
        for (var i = 0; i < sum; i++) {
          
          fecha = actual.toString().split(" ")
          const filtro = fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
          console.log(filtro)
          const query = categoria.orderByChild("fecha")
            .equalTo(filtro).once("value", (data) => {
              this.Bdd(data)
            })
            actual.setDate(actual.getDate() + 1)
        }
        return
      }
      actual.setDate(actual.getDate() + suma)
      fecha = actual.toString().split(" ")
      const filtro = fecha[1].toString() + fecha[2].toString() + fecha[3].toString()
      const query = categoria.orderByChild("fecha")
        .equalTo(filtro).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro2 !== "") && !(this.state.filtro1 !== "") && !(this.state.filtro3 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      const query = categoria.orderByChild("comuna")
        .equalTo(this.state.filtro2.toString()).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if ((this.state.filtro1 !== "") && !(this.state.filtro2 !== "") && !(this.state.filtro3 !== "")) {
      const db = firebase.database()
      const categoria = db.ref("Pins")
      const query = categoria.orderByChild("categoria")
        .equalTo(this.state.filtro1.toString()).once("value", (data) => {
          this.Bdd(data)
        })
    }
    if (!(this.state.filtro1 !== "") && !(this.state.filtro2 !== "") && !(this.state.filtro3 !== "")) {
      firebase.database().ref("Pins").on("value", (data) => {
        this.Bdd(data)
      })
    }
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
      {
        latitude: this.state.region.latitude,
        longitud: this.state.region.longitude
      });
  }
  render() {
    const { region } = this.state;
    this.state.filtro2 = this.props.navigation.getParam('com', "");
    this.state.filtro1 = this.props.navigation.getParam('cat', "");
    this.state.filtro3 = this.props.navigation.getParam('prox', "");



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
            <Marker identifier={marker.identifier}
              coordinate={marker.coordinate}
              onPress={() => { this.props.navigation.navigate("Pin", { id: marker.id }) }}>
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
      <Search onLocationSelected={this.handleLocationSelected} />
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
    bottom: HEIGHT / 7.36,
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
    bottom: HEIGHT / 7.36,
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