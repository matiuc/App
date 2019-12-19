import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';

import * as firebase from "firebase";
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class ResetPass extends Component {
    state = {
        mail: '',
    };
    onChangeText = mail => this.setState({ mail });
    handleChangeName = () => {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.mail).then(function () {
            Alert.alert("Correo Enviado Exitosamente."),
            this.props.navigation.navigate("Login")
        }).catch(function (error) {
            Alert.alert(error.message)
        });
        

    }
    handleCancel = () => {
        this.props.navigation.navigate("Login")
    }

    render() {
        const mail = this.props.navigation.getParam('mail', '');
        return (

            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Login")}>
                    <Image source={require('AwesomeProject/assets/back.png')}

                        style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, top: HEIGHT / 8 }}>
                    <Text style={{
                        color: "#414959", fontSize: 30, textAlign: 'center', fontWeight: "bold", textShadowRadius: 3, textShadowColor: 'rgba(255, 162, 127, 0.75)',
                        textShadowOffset: { width: 1, height: -1 }
                    }}>
                        ¿No recuerdas tu contraseña?
          </Text>
                    <Text style={{ color: "#414959", fontSize: 15, fontWeight: "bold", top: 15, textAlign: 'center' }}>No te preocupes, te enviaremos un mail a tu dirección para que la reestablezcas.</Text>
                    <Text style={{ color: "#414959", fontSize: 25, fontWeight: "bold", left: WIDTH / 10, top: HEIGHT / 20 }}>Email</Text>
                    <TextInput
                        placeholder={mail}
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={this.onChangeText}
                        value={this.state.mail}

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
                            <Text style={{ color: "#FFF", fontWeight: "500", textAlign: 'center' }}>Reestablecer Contraseña</Text>
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
    button1: {
        top: 0,
        right: WIDTH / 10,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        width: 130,
        alignItems: "center",
        justifyContent: "center"
    },
    button2: {
        top: 0,
        left: WIDTH / 10,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    }
});