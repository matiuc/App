 import  React, { Component} from 'react';
 import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
 export default class Search extends Component {
     state={
         searchFocus: false,
     }
     render(){
         const {searchFocused} = this.state;
         const {onLocationSelected} = this.props;
        return (
            <GooglePlacesAutocomplete 
            placeholder="¿En que direccion?"
            placeholderTextColor='#333'
            onPress={onLocationSelected}
            query={{
                key: 'AIzaSyAsZWB2FyFlON63e96tFWEiT7GFHp7c0xM',
                language: 'es',
                components: 'country:cl',
            }}
            textInputProps = {{
                onFocus: () =>{
                    this.setState({searchFocused: true})
                },
                onBlur: () =>{
                    this.setState({searchFocused: false})
                },
                autoCapitalize: "none",
                autoCorrect: false,
            }} 
            listViewDisplayed={searchFocused}
            fetchDetails = {true}
            enablePowerByContainer={false}
            styles = {{ 
                container: {
                    position: 'absolute',
                    top: 60,
                    width: '100%',
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: "transparent",
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                },
                 textInput: {
                     height: 54,
                     margin: 0,
                     borderRadius: 25,
                     paddingTop: 0,
                     paddingBottom: 0,
                     paddingLeft: 20,
                     paddingRight: 20,
                     marginTop: 0,
                     marginLeft: 0,
                     marginRight: 0,
                     elevation: 5,
                     shadowColor: "#000",
                     shadowOpacity: 0.3,
                     shadowOffset: {x: 0, y: 0},
                     shadowRadius: 10, 
                     borderWidth: 1,
                     borderColor: "#DDD",
                     fontSize: 18
                      
                 },
                 listView: {
                     borderWidth: 1,
                     borderColor: "#DDD",
                     backgroundColor: "#FFF",
                     marginHorizontal: 20,
                     elevation: 5,
                     shadowColor: "#000",
                     shadowOpacity: 0.3,
                     shadowOffset: {x: 0, y: 0},
                     shadowRadius: 15,
                     marginTop: 10, 


                 },
                 description: {
                     fontSize: 16,
                 },
                 row: {
                     padding: 20,
                     height: 58
                 },
            }}
            />
        );
     }
 }
