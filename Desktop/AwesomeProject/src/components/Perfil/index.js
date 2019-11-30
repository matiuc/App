import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import * as firebase from "firebase";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const userId = firebase.auth().currentUser.uid;
// name = () => {firebase.database().ref("users").child(userId).once("value", (data) => {
//     json = data.toJSON();
//     clog(json);
// })


export default class Perfil extends Component {

    hola = "hol";

    state = {
        name: "",
        mail: '',
        pass: '',
        errorMessage: null
    };

    async componentDidMount() {
        firebase.database().ref("users").child(userId).once("value", (data) => {
            json = data.toJSON()
            name = json["username"]
            mail = json["email"]
            this.setState({name:name,
            mail:mail});
            
        })}

    

    // onChangeMail = mail => this.setState({ mail });
    // onChangePass = pass => this.setState({ pass });
    // onChangeName = name => this.setState({ name });

    logOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.image}>
                    <Image source={require('AwesomeProject/assets/icprofile.png')} />
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Nombre</Text>
                        <Text style={styles.nombre}>{this.state.name}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <Text style={styles.nombre}>{this.state.mail}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <Text style={styles.nombre}>*********</Text>
                    </View>
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
        flex: 0,
        paddingTop: 0,
        alignItems: 'center',
        marginTop: 100,
        justifyContent: 'center',
        // backgroundColor: "#192879"
    },
    image: {
        marginLeft: 0,
        marginTop: 0,
        height: 0,
        width: 0,
        alignItems: "center"
    },
    username: {
        marginLeft: 0,
        marginTop: 150,
        height: 30,
        width: 120,
        fontSize: 16
    },
    button: {
        top: 40,
        marginHorizontal: 0,
        backgroundColor: "#E9446A",
        height: 52,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    inputTitle: {
        marginLeft: 0,
        marginTop: 30,
        height: 30,
        width: 120,
        fontSize: 13
    },
    form: {
        marginLeft: 0,
        marginTop: 140,
    },
    nombre: {
        marginLeft: 0,
        marginTop: 0,
        fontSize: 16
    }

});