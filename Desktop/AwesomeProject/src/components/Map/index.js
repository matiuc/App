// import React, {Component} from 'react';
// import {StyleSheet, View,  TouchableOpacity, Image, Dimensions, Text} from 'react-native';
// import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import Search from '../Search';

// const WIDTH=Dimensions.get('window').width
// const HEIGHT=Dimensions.get('window').height

// export default class Map extends Component {
//     state = {
//         region: null,
//         destination: null
//     };
//     async componentDidMount(){
//         Geolocation.getCurrentPosition(
//             ({coords: {latitude, longitude}}) => {
//                 this.setState({
//                     region: 
//                     {latitude, 
//                     longitude, 
//                     latitudeDelta: 0.005,
//                     longitudeDelta: 0.005}})
//             }, //Succes
//             () => {}, //Error
//             {
//                 timeout: 2000,
//                 enableHighAccuracy: true,
//                 maximumAge: 1000,
//             }
//         )
//     };
//     onPress = () => {
//         Geolocation.getCurrentPosition(
//             ({coords: {latitude, longitude}}) => {
//                 this.setState({
//                     region: 
//                     {latitude, 
//                     longitude, 
//                     latitudeDelta: 0.005,
//                     longitudeDelta: 0.005}})
//             }, //Succes
//             () => {}, //Error
//             {
//                 timeout: 2000,
//                 enableHighAccuracy: true,
//                 maximumAge: 1000,
//             }
//         );
//         console.log("Buscando")
//       };
//       handleLocationSelected = (data, {geometry}) => {
//         const{location:{lat: latitude, lng: longitude}} = geometry;
//         this.setState({
//             region: 
//             {latitude, 
//             longitude, 
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005}});
//       }
//     render(){
//         const {region} = this.state;
         
//         return( <View style={{flex: 1}}>
    
//         <TouchableOpacity style={styles.button} onPress={this.onPress}>
//             <Image source={require('AwesomeProject/assets/arrow.png')}
            
//               style = {{width:50, height:50}} />
//             </TouchableOpacity>
//          <TouchableOpacity style={styles.button2} onPress={this.onPress}>
//             <Image source={require('AwesomeProject/assets/add.png')}
            
//               style = {{width:60, height:60}} />
//             </TouchableOpacity>
//          <MapView
//          ref={component => this._map = component}
//          style={{flex:1}}
//          provider= {'google'}
//          region={region}
//          showsUserLocation= {true}
//          loadingEnabled={true}>  
//         </MapView>
//         <View style={styles.mapMarkerContainer}>
//         <Text style={{ fontFamily: 'fontawesome', fontSize: 42, color:  
//         "#ad1f1f" }}>&#xf041;</Text>
//         </View>
//          <Search onLocationSelected={this.handleLocationSelected}/>
//         </View>);
//     }
// }
// const styles = StyleSheet.create({
//     mapMarkerContainer:{
//         left: '47%',
//         position: 'absolute',
//         top: '46%'
//     },
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       paddingHorizontal: 10,
//     },
//     button: {
//       zIndex: 9,
//        position: 'absolute',
//        flexDirection: 'row',
//        width: 50,
//        height: 50,
//        bottom: HEIGHT/7.36,
//        right: WIDTH/20,
//        borderRadius: 50,
//        backgroundColor: 'white',
//        alignItems: 'center',
//        shadowColor: 'black',
//        justifyContent: 'center'

      
//     },
//     button2: {
//         zIndex: 9,
//          position: 'absolute',
//          flexDirection: 'row',
//          width: 45,
//          height: 45,
//          bottom: HEIGHT/7.36 + HEIGHT/12,
//          right: WIDTH/20,
//          borderRadius: 50,
//          backgroundColor: 'white',
//          alignItems: 'center',
//          shadowColor: 'black',
//          justifyContent: 'center'
  
        
//       },
//   });

import React, {Component} from 'react';
import {StyleSheet, View,  TouchableOpacity, Image, Dimensions, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Search from '../Search';

const WIDTH=Dimensions.get('window').width
const HEIGHT=Dimensions.get('window').height

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        markers: []
    };
    async componentDidMount(){
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: 
                    {latitude, 
                    longitude, 
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005}})
            }, //Succes
            () => {}, //Error
            {
                timeout: 2000,  
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    };
    onPress = () => {
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: 
                    {latitude, 
                    longitude, 
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005}})
                    this._map.animateToRegion({latitude, 
                        longitude, 
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005}, 1)
            }, //Succes
            () => {}, //Error
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
        console.log("Buscando")
      };
      handleLocationSelected = (data, {geometry}) => {
        const{location:{lat: latitude, lng: longitude}} = geometry;
        this.setState({
            region: 
            {latitude, 
            longitude, 
            latitudeDelta: 0.005,
            longitudeDelta: 0.005}})
            this._map.animateToRegion({latitude, 
                longitude, 
                latitudeDelta: 0.005,
                longitudeDelta: 0.005}, 1);
      };
      // Update state on region change
      onRegionChange = region => {
        this.setState({
          region: region
        });
      }
    
      // Action to be taken after select location button click
      onLocationSelect = () => {alert(this.state.userLocation)
        console.log(this.state.region)
    };
    handlePress = () => {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: this.state.region,
              cost: 2
            }
          ]
        })
      }
    render(){
        const {region} = this.state;
         
        return( <View style={{flex: 1}}>
    
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Image source={require('AwesomeProject/assets/arrow.png')}
            
              style = {{width:50, height:50}} />
            </TouchableOpacity>
         <TouchableOpacity style={styles.button2} onPress={this.handlePress}>
            <Image source={require('AwesomeProject/assets/add.png')}
            
              style = {{width:60, height:60}} />
            </TouchableOpacity>
            
         <MapView
         ref={component => this._map = component}
         style={{flex:1}}
         provider= {'google'}
         initialRegion={region}
         showsUserLocation= {true}
         loadingEnabled={true}
         onRegionChangeComplete={this.onRegionChange}
         > 
         {this.state.markers.map((marker) => {
        return (
          <Marker {...marker} >
            <View style={styles.marker}>
              <Text style={styles.text}>{marker.cost}</Text>
            </View>
          </Marker>
        )
      })}
        </MapView>
        <View style={styles.mapMarkerContainer}>
        <Text style={{ fontFamily: 'fontawesome', fontSize:40, color:  
        "#ad1f1f" }}>&#xf041;</Text>
        </View>
         <Search onLocationSelected={this.handleLocationSelected}/>
        </View>);
    }
}
const styles = StyleSheet.create({
    mapMarkerContainer:{
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
       bottom: HEIGHT/7.36,
       right: WIDTH/20,
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
         bottom: HEIGHT/7.36 + HEIGHT/12,
         right: WIDTH/20,
         borderRadius: 50,
         backgroundColor: 'white',
         alignItems: 'center',
         shadowColor: 'black',
         justifyContent: 'center'
  
        
      },
      marker: {
        backgroundColor: "#550bbc",
        padding: 5,
        borderRadius: 5,
        width: 20,
        height:45,
      },
  });