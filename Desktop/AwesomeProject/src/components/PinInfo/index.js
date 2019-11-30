import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
 
export default class PinInfo extends Component {

    logOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.username}> Nombre </Text>
                <View style={styles.image}>
                    <Image source={require('AwesomeProject/assets/icprofile.png')} />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.logOut}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Log Out</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
    backgroundColor: "#192879"
  },
  image: {
    marginLeft: 15,
    marginTop: 0,
    height: 500,
    width: 120,
    alignItems: "center"
  },
  username: {
    color: "white",
    marginLeft: 65,
    marginTop: 0,
    height: 30,
    width: 120,
    fontSize: 16
  },
  button: {
    top:40,
      marginHorizontal: 30,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 52,
      width: 100,
      alignItems: "center",
      justifyContent: "center"
  }

});