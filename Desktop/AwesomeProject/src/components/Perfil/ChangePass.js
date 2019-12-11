import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';

import * as firebase from "firebase";
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class ChangeName extends Component {
    state = {
        currentPass: '',
        newPass: '',
    };
    onChangeCurrent = currentPass => this.setState({ currentPass });

    onChangeNew = newPass => this.setState({ newPass });
    
    handleChangeName = () => {
        userId = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(userId).update({
            username: this.state.name,
        })
        Alert.alert("Nombre Cambiado con Éxito.")
        this.props.navigation.navigate("Perfil")

    }
    handleCancel = () => {
        this.props.navigation.navigate("Perfil")
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Perfil")}>
                    <Image source={require('AwesomeProject/assets/back.png')}

                        style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, top: HEIGHT / 8 }}>
                    <Text style={{
                        color: "#414959", fontSize: 40, textAlign: 'center', fontWeight: "700", textShadowRadius: 3, textShadowColor: 'rgba(255, 162, 127, 0.75)',
                        textShadowOffset: { width: 1, height: -1 }
                    }}>
                        ¿Quieres cambiar tu contraseña?
          </Text>

                    
                </View>
                <View style={{flex: 1, }}>
                <Text style={{ color: "#414959", fontSize: 25, fontWeight: "700", left: WIDTH / 10, top: HEIGHT / 20 }}>Contraseña Actual</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={this.onChangeCurrent}
                        value={this.state.currentPass}

                    ></TextInput>
                <Text style={{ color: "#414959", fontSize: 25, fontWeight: "700", left: WIDTH / 10, top: HEIGHT / 12 }}>Contraseña Nueva</Text>
                    <TextInput
                        style={styles.input2}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={this.onChangeNew}
                        value={this.state.newPass}

                    ></TextInput>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.button2} onPress={this.handleCancel}>
                            <Text style={{ color: "#FFF", fontWeight: "500" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button1} onPress={this.handleChangeName}>
                            <Text style={{ color: "#FFF", fontWeight: "500", }}>Cambiar Nombre</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
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
    input: {
        top: HEIGHT / 13,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderWidth: StyleSheet.hairlineWidth,
        height: 50,
        marginHorizontal: WIDTH / 10,
        fontSize: 20,
        color: "#161F3D"
    },
    input2: {
        top: HEIGHT / 9,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderWidth: StyleSheet.hairlineWidth,
        height: 50,
        marginHorizontal: WIDTH / 10,
        fontSize: 20,
        color: "#161F3D"
    },
    button1: {
        top: HEIGHT / 20,
        right: WIDTH / 10,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        width: 130,
        alignItems: "center",
        justifyContent: "center"
    },
    button2: {
        top: HEIGHT / 20,
        left: WIDTH / 10,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    }
});