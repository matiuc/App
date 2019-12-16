import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as firebase from "firebase";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class AddPin extends Component {
    handleBack = () => {
        this.props.navigation.navigate("Mapa")
    }

    render() {

        return (<View style={{flex:1}}>
            <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                <Image source={require('AwesomeProject/assets/back.png')}

                    style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

        </View>)
    }
}

const styles = StyleSheet.create({
    back: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 50,
        height: 50,
        top: HEIGHT / 25,
        left: WIDTH / 20,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
});