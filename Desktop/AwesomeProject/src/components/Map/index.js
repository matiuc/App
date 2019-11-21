import React, {Component} from 'react';
import {StyleSheet, View,  TouchableOpacity, Image, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Search from '../Search';

const WIDTH=Dimensions.get('window').width
const HEIGHT=Dimensions.get('window').height

export default class Map extends Component {
    state = {
        region: null
    };
    async componentDidMount(){
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: 
                    {latitude, 
                    longitude, 
                    latitudeDelta: 0.0035,
                    longitudeDelta: 0.0035}})
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
                    latitudeDelta: 0.0055,
                    longitudeDelta: 0.0055}})
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
    render(){
        const {region} = this.state;
         
        return( <View style={{flex: 1}}>
    
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Image source={require('AwesomeProject/assets/arrow.png')}
            
              style = {{width:50, height:50}} />
            </TouchableOpacity>
         <MapView 
         style={{flex:1}}
         provider= {'google'}
         region={region}
         showsUserLocation= {true}
         loadingEnabled={true}/>
         <Search />
        </View>);
    }
}
const styles = StyleSheet.create({
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
  });